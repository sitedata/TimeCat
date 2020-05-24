import { RecordData } from "../../../record/src";
import { SnapshotData } from "../../../snapshot/src";
import { VNode, VSNode } from "../../../virtual-dom/src";
export declare const isDev: boolean;
export declare function logger(data: any): void;
export declare function getTime(): number;
export declare function secondToDate(ms: number): string;
export declare function isSnapshot(frame: RecordData | SnapshotData): boolean;
export declare function classifyRecords(data: (SnapshotData | RecordData)[]): {
    snapshot: SnapshotData;
    records: RecordData[];
}[];
export declare function delay(t?: number): Promise<unknown>;
export declare function isVNode(n: VNode | VSNode): boolean;
