module Clarimine.Collision {
    export function zdnetKr(): Antibody {
        return {
            title: $('#wrap_container_new .sub_tit_area h2').text(),
            content: clearStyles(<HTMLElement>$('#content')[0].cloneNode(true)).innerHTML,
            timestamp: (() => {
                var time = $('#wrap_container_new .sub_tit_area .sub_data').text().split('/');
                var date = new Date(time[0].replace(/\./g, '/'));
                var times = /([AP]M)\s*(\d\d):(\d\d)/i.exec(time[1]);
                var hh = parseInt(times[2]);
                var mm = parseInt(times[3]);
                if (time[1].toUpperCase() === 'PM') hh += 12;
                date.setHours(hh);
                date.setMinutes(mm);
                return <Timestamp>{
                    created: date,
                    lastModified: undefined
                };
            })(),
            reporters: (() => {
                var reporterInfoString = $('#wrap_container_new .sub_tit_area').children().eq(2).text().trim();
                var mail = /[.a-zA-Z0-9]+@[.a-zA-Z0-9]+/.exec(reporterInfoString);
                return [{
                    name: reporterInfoString.split(/\s+/)[0],
                    mail: mail != null ? mail[0] : undefined
                }];
            })()
        }
    }
} 