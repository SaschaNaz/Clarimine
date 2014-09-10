module ArrayExtensions {
    export interface ArrayLike<T> {
        length: number;
        [i: number]: T;
    }
    export function from<T>(arrayLike: ArrayLike<T>, mapFn?: (item: any, index: number) => any, thisArg?: any) {
        var array: T[] = [];
        var push: (item: any, index: number) => any;
        if (!mapFn)
            push = (item: any, index: number) => array.push(item);
        else if (thisArg === undefined)
            push = (item: any, index: number) => array.push(mapFn(item, index));
        else
            push = (item: any, index: number) => array.push(mapFn.call(thisArg, item, index))
        for (var i = 0; i < arrayLike.length; i++)
            push(arrayLike[i], i);
        return array;
    }
}