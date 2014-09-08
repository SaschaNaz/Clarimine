module Clarimine.Collision {
    export function mbn(): Antibody {
        return {
            title: $('#article_title .title_n').contents().eq(0).text().trim(),
            content: (() => {
                var content = <HTMLElement>$('#newsViewArea')[0].cloneNode(true);
                $('*[id*=google]', content).remove();
                return clearStyles(content).innerHTML;
            })(),
            timestamp: {
                created: new Date($('#article_title .reg_dt').text().replace('기사입력', '')),
                lastModified: undefined
            },
            reporters: []
        }
    }
}