module Clarimine.Collision {
    export function kbs(): Antibody {
        return {
            title: $('#GoContent .news_title .tit').text(),
            content: clearStyles(<HTMLElement>$('#content')[0].cloneNode(true)).innerHTML,
            timestamp: (() => {
                var parsedData = $('#GoContent .news_title .time li').contents();
                function parseTime(time: string) {
                    var times = time.split('(');
                    var date = new Date(time[0].replace(/\./, '/'));
                    times = times[1].split(':');
                    date.setHours(parseInt(times[0]));
                    date.setMinutes(parseInt(times[1]));
                    return date;
                }
                return {
                    created: parseTime(parsedData.eq(1).text()),
                    lastModified: parseTime(parsedData.eq(3).text())
                };
            })(),
            reporters: (() => {
                return $('#ulReporterList .reporterArea').toArray().map((reporterArea) => {
                    var mail = $('.reporter_mail img[alt=이메일]', reporterArea).closest('a').attr('href');
                    if (mail !== undefined)
                        mail = /'.*','(.*)'/.exec(mail)[1];
                    return {
                        name: $('.reporter_name', reporterArea).contents().eq(0).text().trim(),
                        mail: mail
                    };
                });
            })(),
        }
    }
}