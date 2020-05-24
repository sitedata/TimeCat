import { SnapshotData } from "../../../snapshot/src";
export declare class IndexedDBOperator {
    db: IDBDatabase;
    DBName: string;
    version: number;
    storeName: string;
    constructor(DBName: string, version: number, storeName: string, callback: (db: IDBDatabase) => void);
    add(data: SnapshotData): void;
    clear(): void;
    readAllRecords(): Promise<(SnapshotData | any)[]>;
    getRecords(): Promise<any[]>;
}
export declare const DBPromise: Promise<IndexedDBOperator>;
