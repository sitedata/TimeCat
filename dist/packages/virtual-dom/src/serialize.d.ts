import { VNode, VSNode } from './types';
export declare const createFlatVNode: (el: Element, isSVG?: boolean) => VNode | VSNode;
export declare const createElement: (el: Element, inheritSVG?: boolean | undefined) => VNode | VSNode | null;
export declare const virtualDOM: {
    createElement: (el: Element, inheritSVG?: boolean | undefined) => VNode | VSNode | null;
};
