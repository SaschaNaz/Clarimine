// ==UserScript==
// @name Clarimine
// @namespace http://0xABCDEF.com/jews
// @description Clarify the news page. Forked from jews
// @include http://news.kbs.co.kr/news/NewsView.do*
// @include http://world.kbs.co.kr/*/news/news_*_detail.htm*
// @include http://imnews.imbc.com/*
// @include http://mbn.mk.co.kr/pages/news/newsView.php*
// @include http://www.mbn.co.kr/pages/news/newsView.php*
// @include http://osen.mt.co.kr/article/*
// @include http://news.khan.co.kr/kh_news/khan_art_view.html*
// @include http://www.mediatoday.co.kr/news/articleView.html*
// @include http://kr.wsj.com/posts/*
// @include http://biz.chosun.com/site/data/html_dir/*
// @include http://www.zdnet.co.kr/news/news_view.asp*
// @copyright 2014 JongChan Choi, 2014 SaschaNaz
// @grant none
// ==/UserScript==
if (Clarimine)
    throw new Error("Clarimine is already loaded.");
var Clarimine;
(function (Clarimine) {
    function clearStyles(element) {
        Array.prototype.forEach.call(element.querySelectorAll('*[style]'), function (child) {
            child.removeAttribute('style');
        });
        Array.prototype.forEach.call(element.querySelectorAll('img'), function (image) {
            image.removeAttribute('width');
            image.removeAttribute('height');
            image.removeAttribute('border');
        });
        return element;
    }
    Clarimine.clearStyles = clearStyles;

    function element(tagName, attributes, children) {
        var tag = document.createElement(tagName);
        if (attributes)
            for (var attribute in attributes)
                tag.setAttribute(attribute, attributes[attribute]);
        if (children) {
            if (Array.isArray(children))
                children.forEach(function (child) {
                    tag.appendChild(child);
                });
            else
                tag.innerHTML = children;
        }
        return tag;
    }
    function text(input) {
        return document.createTextNode(input);
    }
    ;

    function collide() {
        switch (window.location.hostname) {
            case 'news.kbs.co.kr':
                return Clarimine.Collision.kbs();
            case 'world.kbs.co.kr':
                return Clarimine.Collision.kbsWorld();
            case 'imnews.imbc.com':
                return Clarimine.Collision.mbc();
            case 'mbn.mk.co.kr':
            case 'www.mbn.co.kr':
                return Clarimine.Collision.mbn();
            case 'osen.mt.co.kr':
                return Clarimine.Collision.osen();
            case 'news.khan.co.kr':
                return Clarimine.Collision.khan();
            case 'www.mediatoday.co.kr':
                return Clarimine.Collision.mediaToday();
            case 'kr.wsj.com':
                return Clarimine.Collision.wsjKr();
            case 'biz.chosun.com':
                return Clarimine.Collision.chosunBiz();
            case 'www.zdnet.co.kr':
                return Clarimine.Collision.zdnetKr();
            default:
                throw new Error('jews don\'t support this site');
        }
    }

    window.addEventListener('load', function (e) {
        var antibody = collide();

        // Deactivate all former timers
        (function () {
            var id = window.setTimeout('0', 0);
            console.log(id);
            while (id--)
                window.clearTimeout(id);
        })();
        var style = '@import url(http://fonts.googleapis.com/earlyaccess/nanummyeongjo.css);\
body {\
    margin-top: 50px;\
    margin-bottom: 50px;\
    text-align: center;\
}\
#meta {\
    display: inline-block;\
    width: 640px;\
}\
#timestamp {\
    color: #888;\
    font-size: 10pt;\
    text-align: left;\
}\
#timestamp p {\
    margin: 0;\
}\
#reporters {\
    list-style-type: none;\
    text-align: right;\
}\
#reporters .mail {\
    margin-left: 8px;\
}\
#content {\
    display: inline-block;\
    width: 640px;\
    font-family: \'Nanum Myeongjo\', serif;\
    font-size: 11pt;\
    text-align: justify;\
}\
#content img {\
    margin: 15px 0;\
    width: 100%;\
    height: auto;\
}';
        var head = element('head', null, [
            element('title', null, [text(antibody.title || 'jews')]),
            element('style', null, [text(style)]),
            element('meta', { charset: 'utf-8' })
        ]);
        var body = element('body', null, [
            element('h1', null, [text(antibody.title || 'no title')]),
            element('div', { id: 'meta' }, [
                element('div', { id: 'timestamp' }, (function () {
                    var result = [];
                    var created = antibody.timestamp.created;
                    var lastModified = antibody.timestamp.lastModified;
                    if (created !== undefined) {
                        result.push(element('p', null, [
                            text('작성일: '),
                            element('span', { class: 'created' }, [
                                text(created.toLocaleString ? created.toLocaleString() : created.toDateString())
                            ])
                        ]));
                    }
                    if (lastModified !== undefined) {
                        result.push(element('p', null, [
                            text('마지막 수정일: '),
                            element('span', { class: 'last-modified' }, [
                                text(lastModified.toLocaleString ? lastModified.toLocaleString() : lastModified.toDateString())
                            ])
                        ]));
                    }
                    return result;
                })()),
                element('ul', { id: 'reporters' }, antibody.reporters.map(function (reporter) {
                    var li = element('li');
                    if (reporter.name !== undefined)
                        li.appendChild(element('span', { class: 'name' }, [text(reporter.name)]));
                    if (reporter.mail !== undefined)
                        li.appendChild(element('span', { class: 'mail' }, [text(reporter.mail)]));

                    return li;
                }))
            ]),
            element('br'),
            element('div', { id: 'content' }, antibody.content || 'empty')
        ]);

        while (document.documentElement.firstChild)
            document.documentElement.removeChild(document.documentElement.firstChild);

        document.documentElement.appendChild(head);
        document.documentElement.appendChild(body);
    }, true);
})(Clarimine || (Clarimine = {}));
var Clarimine;
(function (Clarimine) {
    (function (Collision) {
        function chosunBiz() {
            return {
                title: $('#title_text').text(),
                content: (function () {
                    var content = $('.article')[0].cloneNode(true);
                    $('.promotion', content).remove();
                    $('div[class*=date_]', content).remove();
                    return Clarimine.clearStyles(content).innerHTML;
                })(),
                timestamp: (function () {
                    var timeStr = $('#date_text')[0].innerText;
                    var created;
                    var cTime = timeStr.match(/입력 : ([^\|]+)/);
                    if (cTime !== null) {
                        created = new Date(cTime[1].trim());
                    }
                    ;
                    var lastModified;
                    var mTime = timeStr.match(/수정 : (.+)/);
                    if (mTime !== null) {
                        lastModified = new Date(mTime[1].trim());
                    }
                    return {
                        created: created,
                        lastModified: lastModified
                    };
                })(),
                reporters: [{
                        name: $('#j1').text().trim().split(' ')[0],
                        mail: $('.j_con_li a').text() || undefined
                    }]
            };
        }
        Collision.chosunBiz = chosunBiz;
    })(Clarimine.Collision || (Clarimine.Collision = {}));
    var Collision = Clarimine.Collision;
})(Clarimine || (Clarimine = {}));
var Clarimine;
(function (Clarimine) {
    (function (Collision) {
        function kbs() {
            return {
                title: $('#GoContent .news_title .tit').text(),
                content: Clarimine.clearStyles($('#content')[0].cloneNode(true)).innerHTML,
                timestamp: (function () {
                    var parsedData = $('#GoContent .news_title .time li').contents();
                    function parseTime(time) {
                        var times = time.split('(');
                        var date = new Date(time[0].replace(/\./, '/'));
                        times = times[1].split(':');
                        date.setHours(parseInt(times[0]));
                        date.setMinutes(parseInt(times[1]));
                        return date;
                    }
                    return {
                        created: parseTime(parsedData.eq(1).text()),
                        lastModified: parseTime(parsedData.eq(3).text())
                    };
                })(),
                reporters: (function () {
                    return $('#ulReporterList .reporterArea').toArray().map(function (reporterArea) {
                        var mail = $('.reporter_mail img[alt=이메일]', reporterArea).closest('a').attr('href');
                        if (mail !== undefined)
                            mail = /'.*','(.*)'/.exec(mail)[1];
                        return {
                            name: $('.reporter_name', reporterArea).contents().eq(0).text().trim(),
                            mail: mail
                        };
                    });
                })()
            };
        }
        Collision.kbs = kbs;
    })(Clarimine.Collision || (Clarimine.Collision = {}));
    var Collision = Clarimine.Collision;
})(Clarimine || (Clarimine = {}));
var Clarimine;
(function (Clarimine) {
    (function (Collision) {
        function kbsWorld() {
            return {
                title: document.getElementById('content_area').getElementsByClassName('title')[0].getElementsByTagName('h2')[0].textContent,
                content: (function () {
                    var photo = document.getElementById('container').getElementsByClassName('photo')[0];
                    var content = document.getElementById('content').cloneNode(true);
                    if (photo !== undefined)
                        content.insertBefore(photo.getElementsByTagName('img')[0], content.firstChild);
                    return Clarimine.clearStyles(content).innerHTML;
                })(),
                timestamp: (function () {
                    var parsedData = document.getElementById('content_area').getElementsByClassName('title')[0].getElementsByTagName('em');
                    return {
                        created: new Date(parsedData[0].textContent.replace(/-/g, '/')),
                        lastModified: new Date(parsedData[1].textContent.replace(/-/g, '/'))
                    };
                })(),
                reporters: []
            };
        }
        Collision.kbsWorld = kbsWorld;
    })(Clarimine.Collision || (Clarimine.Collision = {}));
    var Collision = Clarimine.Collision;
})(Clarimine || (Clarimine = {}));
var Clarimine;
(function (Clarimine) {
    (function (Collision) {
        function khan() {
            return {
                title: $('#container .title_group .CR dt').text(),
                content: (function () {
                    var content = $('#sub_cntTopTxt')[0].cloneNode(true);
                    $('a', content).each(function (_, anchor) {
                        $(anchor).replaceWith($(anchor).contents());
                    });
                    $('#article_bottom_ad, #divBox', content).remove();
                    return Clarimine.clearStyles(content).innerHTML;
                })(),
                timestamp: (function () {
                    var parsedData = $('#container .article_date').contents();
                    return {
                        created: new Date(parsedData.eq(0).text().replace(/-/g, '/')),
                        lastModified: new Date(parsedData.eq(2).text().replace(/-/g, '/'))
                    };
                })(),
                reporters: (function () {
                    var parsedData = $('#container .title_group .CR dd').text().trim().split(/\s+/);
                    return [{
                            name: parsedData[0],
                            mail: parsedData[2] || undefined
                        }];
                })()
            };
        }
        Collision.khan = khan;
    })(Clarimine.Collision || (Clarimine.Collision = {}));
    var Collision = Clarimine.Collision;
})(Clarimine || (Clarimine = {}));
var Clarimine;
(function (Clarimine) {
    (function (Collision) {
        function mbc() {
            return {
                title: $('#content .view-title').text(),
                content: Clarimine.clearStyles($('#DivPrint .view-con')[0].cloneNode(true)).innerHTML,
                timestamp: {
                    created: new Date($('#DivPrint .article-time-date').text()),
                    lastModified: undefined
                },
                reporters: [{
                        name: $('#DivPrint .reporter').text().trim().split(/\s+/)[0],
                        mail: undefined
                    }]
            };
        }
        Collision.mbc = mbc;
    })(Clarimine.Collision || (Clarimine.Collision = {}));
    var Collision = Clarimine.Collision;
})(Clarimine || (Clarimine = {}));
var Clarimine;
(function (Clarimine) {
    (function (Collision) {
        function mbn() {
            return {
                title: $('#article_title .title_n').contents().eq(0).text().trim(),
                content: (function () {
                    var content = $('#newsViewArea')[0].cloneNode(true);
                    $('*[id*=google]', content).remove();
                    return Clarimine.clearStyles(content).innerHTML;
                })(),
                timestamp: {
                    created: new Date($('#article_title .reg_dt').text().replace('기사입력', '')),
                    lastModified: undefined
                },
                reporters: []
            };
        }
        Collision.mbn = mbn;
    })(Clarimine.Collision || (Clarimine.Collision = {}));
    var Collision = Clarimine.Collision;
})(Clarimine || (Clarimine = {}));
var Clarimine;
(function (Clarimine) {
    (function (Collision) {
        function mediaToday() {
            return {
                title: $('#font_title').text().trim(),
                content: Clarimine.clearStyles($('#media_body')[0].cloneNode(true)).innerHTML,
                timestamp: (function () {
                    var data = {};
                    $('#font_email').closest('td[class!="SmN"]').closest('table').find('td[align="left"] table td').text().split(/(입력|노출)\s*:([\d\-\.\s:]+)/).forEach(function (v, i, arr) {
                        if (v === '입력')
                            data.created = new Date(arr[i + 1].trim().replace(/\s+/g, ' ').replace(/[-\.]/g, '/') + '+0900');
                        else if (v === '노출')
                            data.lastModified = new Date(arr[i + 1].trim().replace(/\s+/g, ' ').replace(/[-\.]/g, '/') + '+0900');
                    });
                    return data;
                })(),
                reporters: (function () {
                    var parsedData = $('#font_email').text().split('|');
                    return [{
                            name: parsedData[0].trim(),
                            mail: parsedData[1].trim()
                        }];
                })()
            };
        }
        Collision.mediaToday = mediaToday;
    })(Clarimine.Collision || (Clarimine.Collision = {}));
    var Collision = Clarimine.Collision;
})(Clarimine || (Clarimine = {}));
var Clarimine;
(function (Clarimine) {
    (function (Collision) {
        function osen() {
            return {
                title: $('#container .detailTitle .obj').text().trim(),
                content: (function () {
                    var content = $('#_article')[0].cloneNode(true);
                    $('iframe, #divBox, #scrollDiv, div[class^=tabArea], .mask_div, .articleList', content).remove();
                    $('a', content).each(function (_, anchor) {
                        $(anchor).replaceWith($(anchor).contents());
                    });
                    return Clarimine.clearStyles(content).innerHTML;
                })(),
                timestamp: {
                    created: new Date(/\d{4}.\d\d.\d\d\s+\d\d:\d\d/.exec($('#container .writer').text())[0]),
                    lastModified: undefined
                },
                reporters: (function () {
                    var mail = $('#container .detailLink a[href^=mailto]');
                    var address;
                    if (mail.length > 0)
                        address = mail.attr('href').substr('mailto:'.length);
                    return [{
                            name: $('#container .writer').text().split(/\s+/)[1],
                            mail: address || undefined
                        }];
                })()
            };
        }
        Collision.osen = osen;
    })(Clarimine.Collision || (Clarimine.Collision = {}));
    var Collision = Clarimine.Collision;
})(Clarimine || (Clarimine = {}));
var Clarimine;
(function (Clarimine) {
    (function (Collision) {
        function wsjKr() {
            return {
                title: $('.articleHeadlineBox h1')[0].innerText,
                content: (function () {
                    function remove(e) {
                        e.parentNode.removeChild(e);
                    }
                    var article = document.createElement('div');
                    article.innerHTML = $('.articlePage')[0].innerHTML.split(/\s*<!--\s*article\s*[a-z]+\s*-->\s*/i)[1];
                    Array.prototype.forEach.call(article.querySelectorAll('.socialByline, .insetCol3wide'), function (v) {
                        remove(v);
                    });
                    var article_p = article.getElementsByTagName('p');
                    Array.prototype.forEach.call(article.getElementsByTagName('p'), function (v, i, arr) {
                        if (/기사 번역 관련 문의: [A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+/i.exec(v.innerText))
                            while (arr[i] != null)
                                remove(arr[i]);
                    });
                    remove(article.querySelectorAll('img[src*="//cp.news.search.daum.net"]')[0]);
                    return Clarimine.clearStyles(article).innerHTML;
                })(),
                timestamp: {
                    created: new Date($('.articleHeadlineBox .dateStamp')[0].innerText.replace(/\s*KST\s*$/, ' +0900').replace(/(\d+)\.?\s+([a-z]{3})[a-z]+\s+(\d+)\s*,\s*/i, '$1 $2 $3 ')),
                    lastModified: undefined
                },
                reporters: [{
                        name: $('.socialByline .byline')[0].innerText.trim().replace(/^by\s+/i, ''),
                        mail: undefined
                    }]
            };
        }
        Collision.wsjKr = wsjKr;
    })(Clarimine.Collision || (Clarimine.Collision = {}));
    var Collision = Clarimine.Collision;
})(Clarimine || (Clarimine = {}));
var Clarimine;
(function (Clarimine) {
    (function (Collision) {
        function zdnetKr() {
            return {
                title: $('#wrap_container_new .sub_tit_area h2').text(),
                content: Clarimine.clearStyles($('#content')[0].cloneNode(true)).innerHTML,
                timestamp: (function () {
                    var time = $('#wrap_container_new .sub_tit_area .sub_data').text().split('/');
                    var date = new Date(time[0].replace(/\./g, '/'));
                    var times = /([AP]M)\s*(\d\d):(\d\d)/i.exec(time[1]);
                    var hh = parseInt(times[2]);
                    var mm = parseInt(times[3]);
                    if (time[1].toUpperCase() === 'PM')
                        hh += 12;
                    date.setHours(hh);
                    date.setMinutes(mm);
                    return {
                        created: date,
                        lastModified: undefined
                    };
                })(),
                reporters: (function () {
                    var reporterInfoString = $('#wrap_container_new .sub_tit_area').children().eq(2).text().trim();
                    var mail = /[.a-zA-Z0-9]+@[.a-zA-Z0-9]+/.exec(reporterInfoString);
                    return [{
                            name: reporterInfoString.split(/\s+/)[0],
                            mail: mail != null ? mail[0] : undefined
                        }];
                })()
            };
        }
        Collision.zdnetKr = zdnetKr;
    })(Clarimine.Collision || (Clarimine.Collision = {}));
    var Collision = Clarimine.Collision;
})(Clarimine || (Clarimine = {}));
