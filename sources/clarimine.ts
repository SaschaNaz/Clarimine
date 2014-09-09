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
module Clarimine {
    export interface Antibody {
        title: string;
        content: string;
        timestamp: Timestamp;
        reporters: Reporter[];
    }
    export interface Timestamp {
        created: Date;
        lastModified: Date;
    }
    export interface Reporter {
        name: string;
        mail: string;
    }

    export function clearStyles(element: HTMLElement) {
        Array.prototype.forEach.call(element.querySelectorAll('*[style]'), function (child: Element) {
            child.removeAttribute('style');
        });
        Array.prototype.forEach.call(element.querySelectorAll('img'), function (image: HTMLElement) {
            image.removeAttribute('width');
            image.removeAttribute('height');
            image.removeAttribute('border');
        });
        return element;
    }

    var embedded: HTMLIFrameElement;
    //embedded.style.zIndex = '2147483647';
    //document.body.style.overflow = 'hidden';

    function element(tagName: string, attributes?: { [key: string]: string }, children?: Node[]): HTMLElement
    function element(tagName: string, attributes?: { [key: string]: string }, children?: string): HTMLElement
    function element(tagName: string, attributes?: { [key: string]: string }, children?: any) {
        var tag = embedded.contentDocument.createElement(tagName);
        if (attributes)
            for (var attribute in attributes)
                tag.setAttribute(attribute, attributes[attribute]);
        if (children) {
            if (Array.isArray(children))
                children.forEach((child: Node) => { tag.appendChild(child) });
            else
                tag.innerHTML = children;
        }
        return tag;
    }
    function text(input: string) { return embedded.contentDocument.createTextNode(input) };

    function collide(): Antibody {
        switch (window.location.hostname) {
            case 'news.kbs.co.kr': return Collision.kbs();
            case 'world.kbs.co.kr': return Collision.kbsWorld();
            case 'imnews.imbc.com': return Collision.mbc();
            case 'mbn.mk.co.kr':
            case 'www.mbn.co.kr': return Collision.mbn();
            case 'osen.mt.co.kr': return Collision.osen();
            case 'news.khan.co.kr': return Collision.khan();
            case 'www.mediatoday.co.kr': return Collision.mediaToday();
            case 'kr.wsj.com': return Collision.wsjKr();
            case 'biz.chosun.com': return Collision.chosunBiz();
            case 'www.zdnet.co.kr': return Collision.zdnetKr();
            default: throw new Error('jews don\'t support this site');
        }
    }

    window.addEventListener('load', function (e) {
        var antibody: Antibody = collide();
        // Deactivate all former timers
        (function () {
            var id = window.setTimeout('0', 0);
            console.log(id);
            while (id--) window.clearTimeout(id);
        })();

        document.documentElement.removeChild(document.body);
        document.documentElement.appendChild(document.createElement('body'));
        embedded = document.createElement('iframe');
        embedded.sandbox.value = "allow-same-origin allow-scripts";
        embedded.style.position = "fixed";
        embedded.style.border = '0';
        embedded.style.backgroundColor = 'white';
        embedded.style.top = embedded.style.left = '0';
        embedded.style.width = embedded.style.height = '100%';

        embedded.onload = () => {
            var style = '\
@import url(http://fonts.googleapis.com/earlyaccess/nanummyeongjo.css);\
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
            var head =
                element('head', null, [
                    element('title', null, [text(antibody.title || 'jews')]),
                    element('style', null, [text(style)]),
                    element('meta', { charset: 'utf-8' })
                ]);
            var body =
                element('body', null, [
                    element('h1', null, [text(antibody.title || 'no title')]),
                    element('div', { id: 'meta' }, [
                        element('div', { id: 'timestamp' },
                            (function () {
                                var result = [];
                                var created = antibody.timestamp.created;
                                var lastModified = antibody.timestamp.lastModified;
                                if (created !== undefined) {
                                    result.push(element('p', null, [
                                        text('작성일: '),
                                        element('span', { class: 'created' }, [
                                            text(created.toLocaleString ? created.toLocaleString() : created.toDateString())
                                        ]),
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
                        element('ul', { id: 'reporters' },
                            antibody.reporters.map(function (reporter) {
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

            embedded.contentDocument.head.appendChild(head);
            embedded.contentDocument.body.appendChild(body);
        };
        document.body.appendChild(embedded);
    }, true);
}