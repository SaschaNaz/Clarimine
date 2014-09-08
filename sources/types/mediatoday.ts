module Clarimine.Collision {
    export function mediaToday(): Antibody {
        return {
            title: $('#font_title').text().trim(),
            content: clearStyles(<HTMLElement>$('#media_body')[0].cloneNode(true)).innerHTML,
            timestamp: (() => {
                var data = <Timestamp>{};
                $('#font_email').closest('td[class!="SmN"]').closest('table').find('td[align="left"] table td').text().split(/(입력|노출)\s*:([\d\-\.\s:]+)/).forEach((v, i, arr) => {
                    if (v === '입력')
                        data.created = new Date(arr[i + 1].trim().replace(/\s+/g, ' ').replace(/[-\.]/g, '/') + '+0900');
                    else if (v === '노출')
                        data.lastModified = new Date(arr[i + 1].trim().replace(/\s+/g, ' ').replace(/[-\.]/g, '/') + '+0900');
                });
                return data;
            })(),
            reporters: (() => {
                var parsedData = $('#font_email').text().split('|')
                return [{
                    name: parsedData[0].trim(),
                    mail: parsedData[1].trim()
                }];
            })()
        }
    }
}