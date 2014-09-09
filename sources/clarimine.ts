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

        UI.backup = <HTMLBodyElement>document.body;
        document.documentElement.removeChild(document.body);
        document.documentElement.appendChild(document.createElement('body'));

        var embedded = UI.embedded = document.createElement('iframe');
        embedded.sandbox.value = "allow-same-origin allow-scripts";
        embedded.style.position = "fixed";
        embedded.style.border = '0';
        embedded.style.backgroundColor = 'white';
        embedded.style.top = embedded.style.left = '0';
        embedded.style.width = embedded.style.height = '100%';

        embedded.onload = () => {
            var reaction = UI.react(antibody);
            embedded.contentDocument.head.appendChild(reaction.head);
            embedded.contentDocument.body.appendChild(reaction.body);
        };
        document.body.appendChild(embedded);
    }, true);
}