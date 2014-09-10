module Clarimine.Collision {
    export function kbs(): Antibody {
        return {
            title: document.querySelector('#GoContent .news_title .tit').textContent,
            content: clearStyles(<HTMLElement>document.querySelector('#content').cloneNode(true)).innerHTML,
            timestamp: (() => {
                var parsedData = document.querySelectorAll('#GoContent .news_title .time li');
                function parseTime(time: string) {
                    var times = time.split('(');
                    var date = new Date(time[0].replace(/\./, '/'));
                    times = times[1].split(':');
                    date.setHours(parseInt(times[0]));
                    date.setMinutes(parseInt(times[1]));
                    return date;
                }
                return {
                    created: parseTime(parsedData[0].childNodes[1].textContent),
                    lastModified: parseTime(parsedData[1].childNodes[1].textContent)
                };
            })(),
            reporters: (() => {
                return ArrayExtensions.from(document.querySelectorAll('#ulReporterList .reporterArea')).map((reporterArea: Element) => {
                    var mail = (<HTMLAnchorElement>ArrayExtensions.from(reporterArea.querySelectorAll('.reporter_mail a')).filter((a: Element) => !!a.querySelector('img[alt=이메일]'))[0]).href;
                    if (mail !== undefined)
                        mail = /'.*','(.*)'/.exec(mail)[1].trim();
                    return {
                        name: reporterArea.querySelector('.reporter_name').childNodes[0].textContent.trim(),
                        mail: mail
                    };
                });
            })(),
        }
    }
}