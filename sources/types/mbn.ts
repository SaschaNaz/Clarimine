module Clarimine.Collision {
    export function mbn(): Antibody {
        return {
            title: document.querySelector('#article_title .title_n').childNodes[0].textContent.trim(),
            content: (() => {
                var content = <HTMLElement>document.querySelector('#newsViewArea').cloneNode(true);
                Helpers.removeFromTree(content.querySelectorAll('*[id*=google]'));
                return Helpers.clearStyles(content).innerHTML;
            })(),
            timestamp: {
                created: new Date(document.querySelector('#article_title .reg_dt').textContent.replace('기사입력', '')),
                lastModified: undefined
            },
            reporters: []
        }
    }
}