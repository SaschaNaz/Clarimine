module Clarimine.Collision {
    export function kbsWorld(): Antibody {
        return {
            title: (<HTMLElement>document.getElementById('content_area').getElementsByClassName('title')[0]).getElementsByTagName('h2')[0].textContent,
            content: (() => {
                var photo = <HTMLElement>document.getElementById('container').getElementsByClassName('photo')[0];
                var content = <HTMLElement>document.getElementById('content').cloneNode(true);
                if (photo !== undefined)
                    content.insertBefore(photo.getElementsByTagName('img')[0], content.firstChild);
                return clearStyles(content).innerHTML;
            })(),
            timestamp: (() => {
                var parsedData = (<HTMLElement>document.getElementById('content_area').getElementsByClassName('title')[0]).getElementsByTagName('em');
                return {
                    created: new Date(parsedData[0].textContent.replace(/-/g, '/')),
                    lastModified: new Date(parsedData[1].textContent.replace(/-/g, '/'))
                };
            })(),
            reporters: []
        }
    }
}