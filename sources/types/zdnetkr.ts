module Clarimine.Collision {
    export function zdnetKr(): Antibody {
        return {
            title: $('#wrap_container_new .sub_tit_area h2').text(),
            content: clearStyles(<HTMLElement>$('#content')[0].cloneNode(true)).innerHTML,
            timestamp: {
                created: undefined,
                lastModified: undefined
            },
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