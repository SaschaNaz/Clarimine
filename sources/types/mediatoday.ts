module Clarimine.Collision {
    export function mediaToday(): Antibody {
        return {
            title: document.getElementById('font_title').textContent.trim(),
            content: Helpers.clearStyles(<HTMLElement>document.getElementById('media_body').cloneNode(true)).innerHTML,
            timestamp: (() => {
                var data = <Timestamp>{};
                Helpers.has(document.getElementsByTagName('table'), 'td:not(.SmN) #font_email')[0]
                    .querySelector('td[align="left"] table td')
                    .textContent.split(/(입력|노출)\s*:([\d\-\.\s:]+)/).forEach((v, i, arr) => {
                        if (v === '입력')
                            data.created = new Date(arr[i + 1].trim().replace(/\s+/g, ' ').replace(/[-\.]/g, '/') + '+0900');
                        else if (v === '노출')
                            data.lastModified = new Date(arr[i + 1].trim().replace(/\s+/g, ' ').replace(/[-\.]/g, '/') + '+0900');
                    });
                return data;
            })(),
            reporters: (() => {
                var parsedData = document.getElementById('font_email').textContent.split('|')
                return [{
                    name: parsedData[0].trim(),
                    mail: parsedData[1].trim()
                }];
            })()
        }
    }
}