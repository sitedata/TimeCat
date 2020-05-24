
declare interface AttributesUpdateData {
    id: number;
    value: string | boolean;
    key: string;
}

declare type Attrs = {
    [key: string]: string;
};

declare interface CharacterDataUpdateData {
    parentId: number;
    value: string;
    id: number;
}

declare type Children = (VNode | VSNode)[];

declare interface DOMSnapshotData {
    vNode: VNode;
}

declare interface DOMUpdateDataType {
    addedNodes: UpdateNodeData[];
    movedNodes: movedNodesData[];
    removedNodes: RemoveUpdateData[];
    attrs: AttributesUpdateData[];
    texts: CharacterDataUpdateData[];
}

declare interface DOMWatcher {
    type: RecordType.DOM_UPDATE;
    data: DOMWatcherData;
    time: string;
}

declare interface DOMWatcherData extends DOMUpdateDataType {
}

export declare function exportReplay(opts?: Opts): Promise<void>;

declare type Extra = {
    props?: {
        [key: string]: string | number | boolean;
    };
    isSVG?: boolean;
};

declare enum FormElementEvent {
    'PROP' = "PROP",
    'INPUT' = "INPUT",
    'CHANGE' = "CHANGE",
    'FOCUS' = "FOCUS",
    'BLUR' = "BLUR"
}

declare interface FormElementWatcher {
    type: RecordType.FORM_EL_UPDATE;
    data: FormElementWatcherData;
    time: string;
}

declare interface FormElementWatcherData {
    type: FormElementEvent;
    id: number;
    key?: string;
    value?: string;
}

declare class IndexedDBOperator {
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

declare interface InfoData {
    doctype: DocumentType;
    origin: string;
    pathname: string;
    width: number;
    height: number;
    scrollLeft: number;
    scrollTop: number;
}

declare enum MouseEventType {
    'MOVE' = "MOVE",
    'CLICK' = "click"
}

declare interface MouseRecord {
    type: RecordType.MOUSE;
    data: MouseRecordData;
    time: string;
}

declare interface MouseRecordData {
    type: MouseEventType;
    x: number;
    y: number;
    id?: number;
}

declare interface movedNodesData {
    parentId: number;
    id: number;
    nextId: number | null;
}

declare type Opts = {
    scripts?: ScriptItem[];
    autoPlay?: boolean;
};

export declare function record(fn?: (data: RecordData, db: IndexedDBOperator) => void): {
    unsubscribe: () => void;
};

declare type RecordData = FormElementWatcher | DOMWatcher | MouseRecord | WindowWatcher | ScrollWatcher;

declare enum RecordType {
    'WINDOW' = "WINDOW",
    'SCROLL' = "SCROLL",
    'MOUSE' = "MOUSE",
    'DOM_UPDATE' = "DOM_UPDATE",
    'FORM_EL_UPDATE' = "FORM_EL_UPDATE"
}

declare interface RemoveUpdateData {
    parentId: number;
    id: number;
}

export declare function replay(options: ReplayOptions): Promise<void>;

declare interface ReplayOptions {
    socketUrl?: string;
    proxy?: string;
}

declare type ScriptItem = {
    name: string;
    src: string;
};

declare interface ScrollWatcher {
    type: RecordType.SCROLL;
    data: ScrollWatcherData;
    time: string;
}

declare interface ScrollWatcherData {
    id: number;
    top: number;
    left: number;
}

declare type SnapshotData = DOMSnapshotData & InfoData;

declare interface UpdateNodeData {
    parentId: number;
    nextId: number | null;
    node: VSNode | VNode | number;
}

declare interface VNode {
    type: number;
    id: number;
    tag: string;
    attrs: Attrs;
    children: Children;
    extra: Extra;
}

declare interface VSNode {
    id: number;
    type: number;
    value: string;
}

declare interface WindowWatcher {
    type: RecordType.WINDOW;
    data: WindowWatcherData;
    time: string;
}

declare interface WindowWatcherData {
    id: number;
    width: number;
    height: number;
}

export { }
