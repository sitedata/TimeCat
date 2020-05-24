declare type ScriptItem = {
    name: string;
    src: string;
};
export declare type Opts = {
    scripts?: ScriptItem[];
    autoPlay?: boolean;
};
export declare function exportReplay(opts?: Opts): Promise<void>;
export {};
