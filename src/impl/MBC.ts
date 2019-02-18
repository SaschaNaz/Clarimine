import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from 'index';

export function parse(): Article {
    return {
        title: $('#news_content_1 .title').text().trim(),
        content: clearStyles($("#news_content_1 .body")[0].cloneNode(true)).innerHTML,
        timestamp: {
            created: new Date($("#news_content_1 .wrap_time span")[1].childNodes[1].textContent.trim().replace(/-/g, '/')),
            lastModified: new Date($("#news_content_1 .wrap_time span")[2].childNodes[1].textContent.trim().replace(/-/g, '/'))
        },
        reporters: [{
            name: $("#news_content_1 .wrap_time span:first-child").text().trim().split(/\s+/)[0],
            mail: undefined
        }]
    };
}
