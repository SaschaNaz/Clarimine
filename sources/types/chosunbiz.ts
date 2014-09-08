module Clarimine.Collision {
    export function chosunBiz(): Antibody {
        return {
            title: $('#title_text').text(),
            content: (() => {
                var content = <HTMLElement>$('.article')[0].cloneNode(true);
                $('.promotion', content).remove();
                $('div[class*=date_]', content).remove();
                return clearStyles(content).innerHTML;
            })(),
            timestamp: (() => {
                var timeStr = $('#date_text')[0].innerText;
                var created: Date;
                var cTime = timeStr.match(/입력 : ([^\|]+)/);
                if (cTime !== null) {
                    created = new Date(cTime[1].trim());
                };
                var lastModified: Date;
                var mTime = timeStr.match(/수정 : (.+)/);
                if (mTime !== null) {
                    lastModified = new Date(mTime[1].trim());
                }
                return {
                    created: created,
                    lastModified: lastModified
                };
            })(),
            reporters: [{
                name: $('#j1').text().trim().split(' ')[0],
                mail: $('.j_con_li a').text() || undefined
            }]
        }
    }
}