import { VNode, VSNode } from './types';
export declare function convertVNode(vNode: VNode | VSNode | null, parent?: VNode): Element | null;
export declare function createSpecialNode(vsNode: VSNode): Node;
export declare function createNode(vNode: VNode): Element;
