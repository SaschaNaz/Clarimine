module Clarimine.Collision {
    export function osen(): Antibody {
        return {
            title: document.querySelector('#container .detailTitle .obj').textContent.trim(),
            content: (() => {
                var content = <HTMLElement>document.getElementById('_article').cloneNode(true);
                // Remove these elements
                ArrayExtensions.from(content.querySelectorAll('iframe, #divBox, #scrollDiv, div[class^=tabArea], .mask_div, .articleList'))
                    .forEach((el) => el.parentNode.removeChild(el));
                // Replace these elements with their children
                ArrayExtensions.from(content.getElementsByTagName('a')).forEach((a) => {
                    ArrayExtensions.from(a.childNodes).forEach((child) => {
                        a.removeChild(child);
                        a.parentNode.insertBefore(child, a);
                    });
                    a.parentNode.removeChild(a);
                });
                return clearStyles(content).innerHTML;
            })(),
            timestamp: {
                created: new Date(/\d{4}.\d\d.\d\d\s+\d\d:\d\d/.exec(document.querySelector('#container .writer').textContent)[0]),
                lastModified: undefined
            },
            reporters: (() => {
                var mail = <HTMLAnchorElement>document.querySelector('#container .detailLink a[href^=mailto]');
                var address: string;
                if (mail)
                    address = mail.href.substr('mailto:'.length);
                return [{
                    name: document.querySelector('#container .writer').textContent.split(/\s+/)[1],
                    mail: address || undefined
                }];
            })()
        }
    }
}