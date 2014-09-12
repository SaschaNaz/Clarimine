module Clarimine.Collision {
    export function wsjKr(): Antibody {
        return {
            title: $('.articleHeadlineBox h1')[0].innerText,
            content: (() => {
                function remove(e: Node) {
                    e.parentNode.removeChild(e);
                }
                var article = document.createElement('div');
                article.innerHTML = $('.articlePage')[0].innerHTML.split(/\s*<!--\s*article\s*[a-z]+\s*-->\s*/i)[1];
                Array.prototype.forEach.call(article.querySelectorAll('.socialByline, .insetCol3wide'), (v: Node) => { remove(v) });
                var article_p = article.getElementsByTagName('p');
                Array.prototype.forEach.call(article.getElementsByTagName('p'), (v: HTMLElement, i: number, arr: HTMLElement[]) => {
                    if (/기사 번역 관련 문의: [A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+/i.exec(v.innerText))
                        while (arr[i] != null)
                            remove(arr[i]);
                });
                remove(<Node>article.querySelectorAll('img[src*="//cp.news.search.daum.net"]')[0]);
                return Helpers.clearStyles(article).innerHTML;
            })(),
            timestamp: {
                created: new Date($('.articleHeadlineBox .dateStamp')[0].innerText.replace(/\s*KST\s*$/, ' +0900').replace(/(\d+)\.?\s+([a-z]{3})[a-z]+\s+(\d+)\s*,\s*/i, '$1 $2 $3 ')), /* RFC 2822 */
                lastModified: undefined
            },
            reporters: [{
                name: $('.socialByline .byline')[0].innerText.trim().replace(/^by\s+/i, ''),
                mail: undefined
            }]
        }
    }
}