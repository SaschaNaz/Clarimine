module Clarimine.Collision {
    export function khan(): Antibody {
        return {
            title: $('#container .title_group .CR dt').text(),
            content: (() => {
                var content = <HTMLElement>document.querySelector('#sub_cntTopTxt').cloneNode(true);
                Helpers.replaceWithChildren(content.getElementsByTagName('a'));
                Helpers.removeFromTree(content.querySelectorAll('#article_bottom_ad, #divBox'));
                return Helpers.clearStyles(content).innerHTML;
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