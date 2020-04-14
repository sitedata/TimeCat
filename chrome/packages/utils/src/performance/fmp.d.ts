declare class FMP {
    interval: number;
    len: number;
    listener: Array<() => void>;
    constructor();
    observe(): void;
    isMatchType(entry: PerformanceResourceTiming): true | undefined;
    ready(fn: () => void): void;
}
export declare const fmp: FMP;
export {};
