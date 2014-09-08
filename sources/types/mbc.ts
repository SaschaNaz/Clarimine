module Clarimine.Collision {
    export function mbc(): Antibody {
        return {
            title: $('#content .view-title').text(),
            content: clearStyles(<HTMLElement>$('#DivPrint .view-con')[0].cloneNode(true)).innerHTML,
            timestamp: {
                created: new Date($('#DivPrint .article-time-date').text()),
                lastModified: undefined
            },
            reporters: [{
                name: $('#DivPrint .reporter').text().trim().split(/\s+/)[0],
                mail: undefined
            }]
        }
    }
}