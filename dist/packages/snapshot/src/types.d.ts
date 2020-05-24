import { VNode } from "../../virtual-dom/src";
export interface InfoData {
    doctype: DocumentType;
    origin: string;
    pathname: string;
    width: number;
    height: number;
    scrollLeft: number;
    scrollTop: number;
}
export interface DOMSnapshotData {
    vNode: VNode;
}
export declare type SnapshotData = DOMSnapshotData & InfoData;
