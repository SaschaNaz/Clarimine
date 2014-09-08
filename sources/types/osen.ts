module Clarimine.Collision {
    export function osen(): Antibody {
        return {
            title: $('#container .detailTitle .obj').text().trim(),
            content: (() => {
                var content = <HTMLElement>$('#_article')[0].cloneNode(true);
                $('iframe, #divBox, #scrollDiv, div[class^=tabArea], .mask_div, .articleList', content).remove();
                $('a', content).each(function (_, anchor) {
                    $(anchor).replaceWith($(anchor).contents());
                });
                return clearStyles(content).innerHTML;
            })(),
            timestamp: {
                created: new Date(/\d{4}.\d\d.\d\d\s+\d\d:\d\d/.exec($('#container .writer').text())[0]),
                lastModified: undefined
            },
            reporters: (() => {
                var mail = $('#container .detailLink a[href^=mailto]');
                var address: string;
                if (mail.length > 0)
                    address = mail.attr('href').substr('mailto:'.length);
                return [{
                    name: $('#container .writer').text().split(/\s+/)[1],
                    mail: address || undefined
                }];
            })()
        }
    }
}