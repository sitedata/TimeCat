declare type Attrs = {
    [key: string]: string;
};
declare type Extra = {
    props?: {
        [key: string]: string | number | boolean;
    };
    isSVG?: boolean;
};
declare type Children = (VNode | VSNode)[];
export interface VSNode {
    id: number;
    type: number;
    value: string;
}
export interface VNode {
    type: number;
    id: number;
    tag: string;
    attrs: Attrs;
    children: Children;
    extra: Extra;
}
export {};
