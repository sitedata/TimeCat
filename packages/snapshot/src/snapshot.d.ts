import { InfoData, DOMSnapshotData } from './types';
declare function getInitInfo(): InfoData;
declare function DOMSnapshot(): DOMSnapshotData;
export declare const snapshots: {
    getInitInfo: typeof getInitInfo;
    DOMSnapshot: typeof DOMSnapshot;
};
export {};
