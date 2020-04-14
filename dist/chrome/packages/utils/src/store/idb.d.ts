import { SnapshotData } from '@WebReplay/snapshot';
export declare class IndexedDBOperator {
    db: IDBDatabase;
    DBName: string;
    version: number;
    storeName: string;
    constructor(DBName: string, version: number, storeName: string, callback: (db: IDBDatabase) => void);
    add(data: SnapshotData): void;
    clear(): void;
    readAll(): Promise<SnapshotData[]>;
    getData(): Promise<{
        vNode: import("../../../virtual-dom/src").VNode;
        data: SnapshotData[];
        width: number;
        height: number;
        scrollTop: number;
        scrollLeft: number;
        origin: string;
        pathname: string;
    }>;
}
export declare const DBPromise: Promise<IndexedDBOperator>;
