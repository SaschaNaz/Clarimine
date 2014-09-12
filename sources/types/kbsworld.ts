module Clarimine.Collision {
    export function kbsWorld(): Antibody {
        return {
            title: document.querySelector('#content_area .title h2').textContent,
            content: (() => {
                var photo = <HTMLElement>document.querySelector('#container .photo');
                var content = <HTMLElement>document.getElementById('content').cloneNode(true);
                if (photo !== undefined)
                    content.insertBefore(photo.getElementsByTagName('img')[0], content.firstChild);
                return Helpers.clearStyles(content).innerHTML;
            })(),
            timestamp: (() => {
                var parsedData = document.querySelectorAll('#content_area .title em');
                return {
                    created: new Date(parsedData[0].textContent.replace(/-/g, '/')),
                    lastModified: new Date(parsedData[1].textContent.replace(/-/g, '/'))
                };
            })(),
            reporters: []
        }
    }
}