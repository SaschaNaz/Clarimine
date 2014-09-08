module Clarimine.Collision {
    export function khan(): Antibody {
        return {
            title: $('#container .title_group .CR dt').text(),
            content: (() => {
                var content = <HTMLElement>$('#sub_cntTopTxt')[0].cloneNode(true);
                $('a', content).each(function (_, anchor) {
                    $(anchor).replaceWith($(anchor).contents());
                });
                $('#article_bottom_ad, #divBox', content).remove();
                return clearStyles(content).innerHTML;
            })(),
            timestamp: (() => {
                var parsedData = $('#container .article_date').contents();
                return {
                    created: new Date(parsedData.eq(0).text().replace(/-/g, '/')),
                    lastModified: new Date(parsedData.eq(2).text().replace(/-/g, '/'))
                };
            })(),
            reporters: (() => {
                var parsedData = $('#container .title_group .CR dd').text().trim().split(/\s+/);
                return [{
                    name: parsedData[0],
                    mail: parsedData[2] || undefined
                }];
            })()
        }
    }
}