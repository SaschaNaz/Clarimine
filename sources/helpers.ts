module Clarimine.Helpers {
    export function clearStyles(element: HTMLElement) {
        Array.prototype.forEach.call(element.querySelectorAll('*[style]'), function (child: Element) {
            child.removeAttribute('style');
        });
        Array.prototype.forEach.call(element.querySelectorAll('img'), function (image: HTMLElement) {
            image.removeAttribute('width');
            image.removeAttribute('height');
            image.removeAttribute('border');
        });
        return element;
    }

    export function removeFromTree(nodes: NodeList) {
        ArrayExtensions.from(nodes).forEach((node) => node.parentNode.removeChild(node));
    }

    export function replaceWithChildren(nodes: NodeList) {
        ArrayExtensions.from(nodes).forEach((node) => {
            ArrayExtensions.from(node.childNodes).forEach((child) => {
                node.removeChild(child);
                node.parentNode.insertBefore(child, node);
            });
            node.parentNode.removeChild(node);
        });
    }

    export function has(targets: NodeListOf<Element>, selector: string) {
        return ArrayExtensions.from(targets).filter((el) => !!el.querySelector(selector))
    }
}

interface NodeSelector {
    querySelectorAll(selectors: string): NodeListOf<Element>;
}