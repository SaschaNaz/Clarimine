module Clarimine.Collision {
    export function mbc(): Antibody {
        return {
            title: document.querySelector('#content .view-title').textContent,
            content: clearStyles(<HTMLElement>document.querySelector('#DivPrint .view-con').cloneNode(true)).innerHTML,
            timestamp: {
                created: new Date(document.querySelector('#DivPrint .article-time-date').textContent),
                lastModified: undefined
            },
            reporters: [{
                name: document.querySelector('#DivPrint .reporter').textContent.trim().split(/\s+/)[0],
                mail: undefined
            }]
        }
    }
}