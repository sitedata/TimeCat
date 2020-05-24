export declare function objectEquals(x: any, y: any): boolean;
export declare function throttle(func: Function, wait: number, options?: {
    leading?: boolean;
    trailing?: boolean;
}): any;
declare type Procedure = (...args: any[]) => void;
declare type Options = {
    isImmediate: boolean;
};
export declare function debounce<F extends Procedure>(func: F, waitMilliseconds: number, options?: Options): (this: ThisParameterType<F>, ...args: Parameters<F>) => void;
export {};
