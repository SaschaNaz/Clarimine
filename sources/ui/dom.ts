module Clarimine.UI {
    export var embedded: HTMLIFrameElement;
    export var backup: HTMLBodyElement;

    function element(tagName: string, properties?: { [key: string]: any }, children?: Node[]): HTMLElement
    function element(tagName: string, properties?: { [key: string]: any }, children?: string): HTMLElement
    function element(tagName: string, properties?: { [key: string]: any }, children?: any) {
        var tag = embedded.contentDocument.createElement(tagName);
        if (properties)
            for (var property in properties)
                (<any>tag)[property] = properties[property];
        if (children) {
            if (Array.isArray(children))
                children.forEach((child: Node) => { tag.appendChild(child) });
            else
                tag.innerHTML = children;
        }
        return tag;
    }
    function text(input: string) { return embedded.contentDocument.createTextNode(input) };

    export function react(antibody: Antibody) {
        var rollback = () => {
            document.documentElement.removeChild(document.body);
            document.documentElement.appendChild(backup);
        };

        return {
            head:
                element('head', null, [
                    element('title', null, [text(antibody.title || 'jews')]),
                    element('style', null, [text(style)]),
                    element('meta', { charset: 'utf-8' })
                ]),
            body:
                element('body', null, [
                    element('h1', null, [text(antibody.title || 'no title')]),
                    element('div', { id: 'meta' }, [
                        element('div', { id: 'timestamp' },
                            (() => {
                                var result = [];
                                var created = antibody.timestamp.created;
                                var lastModified = antibody.timestamp.lastModified;
                                if (created !== undefined) {
                                    result.push(element('p', null, [
                                        text('작성일: '),
                                        element('span', { className: 'created' }, [
                                            text(created.toLocaleString ? created.toLocaleString() : created.toDateString())
                                        ]),
                                    ]));
                                }
                                if (lastModified !== undefined) {
                                    result.push(element('p', null, [
                                        text('마지막 수정일: '),
                                        element('span', { className: 'last-modified' }, [
                                            text(lastModified.toLocaleString ? lastModified.toLocaleString() : lastModified.toDateString())
                                        ])
                                    ]));
                                }
                                return result;
                            })()),
                        element('ul', { id: 'reporters' },
                            antibody.reporters.map((reporter) => {
                                var li = element('li');
                                if (reporter.name !== undefined)
                                    li.appendChild(element('span', { className: 'name' }, [text(reporter.name)]));
                                if (reporter.mail !== undefined)
                                    li.appendChild(element('span', { className: 'mail' }, [text(reporter.mail)]));

                                return li;
                            }))
                    ]),
                    element('br'),
                    element('div', { id: 'content' }, antibody.content || 'empty'),
                    element('div', { id: 'rollback' }, [element('a', { onclick: rollback, href: '#' }, [text('원본 보기')])])
                ])
        };
    }
} 