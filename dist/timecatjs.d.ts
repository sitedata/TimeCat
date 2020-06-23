
declare interface AttributesUpdateData {
    id: number;
    value: string | boolean;
    key: string;
}

declare type Attrs = {
    [key: string]: string;
};

declare interface AudioOptions {
    type: 'opts';
    data: RecorderOptions;
}

declare interface AudioRecord {
    type: RecordType.AUDIO;
    data: AudioStrList | AudioOptions;
    time: string;
}

declare interface AudioStrList {
    type: 'base64';
    data: string[];
}

declare interface CharacterDataUpdateData {
    parentId: number;
    value: string;
    id: number;
}

declare type Children = (VNode | VSNode)[];

declare interface DOMRecord {
    type: RecordType.DOM_UPDATE;
    data: DOMWatcherData;
    time: string;
}

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

declare interface DOMWatcherData extends DOMUpdateDataType {
}

declare type ExportOptions = {
    scripts?: ScriptItem[];
    autoplay?: boolean;
    audioExternal?: boolean;
    dataExternal?: boolean;
};

export declare function exportReplay(exportOptions: ExportOptions): Promise<void>;

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

declare interface FormElementRecord {
    type: RecordType.FORM_EL_UPDATE;
    data: FormElementWatcherData;
    time: string;
}

declare interface FormElementStrPatches {
    index: number;
    type: 'add' | 'rm';
    value?: string | undefined;
    len?: number | undefined;
}

declare interface FormElementWatcherData {
    type: FormElementEvent;
    id: number;
    key?: string;
    value?: string;
    patches?: FormElementStrPatches[];
}

declare class IndexedDBOperator {
    db: IDBDatabase;
    DBName: string;
    version: number;
    storeName: string;
    constructor(DBName: string, version: number, storeName: string, callback: (db: IDBDatabase) => void);
    add(data: SnapshotData | RecordData): void;
    clear(): void;
    readAllRecords(): Promise<(SnapshotData | RecordData)[]>;
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

declare interface NONERecord {
    type: RecordType.NONE;
    data: null;
    time: string;
}

export declare const record: (options: RecordOptions) => {
    unsubscribe: () => void;
};

declare type RecordData = FormElementRecord | DOMRecord | MouseRecord | WindowRecord | ScrollRecord | AudioRecord | NONERecord;

declare interface RecorderOptions {
    sampleBits: 8 | 16;
    sampleRate: 8000 | 16000 | 22050 | 24000 | 44100 | 48000;
    channelCount: 1 | 2;
}

declare interface RecordOptions {
    audio?: boolean;
    emitter?: (data: RecordData, db: IndexedDBOperator) => void;
}

declare enum RecordType {
    'WINDOW' = "WINDOW",
    'SCROLL' = "SCROLL",
    'MOUSE' = "MOUSE",
    'DOM_UPDATE' = "DOM_UPDATE",
    'FORM_EL_UPDATE' = "FORM_EL_UPDATE",
    'AUDIO' = "AUDIO",
    'NONE' = "NONE"
}

declare interface RemoveUpdateData {
    parentId: number;
    id: number;
}

export declare function replay(options?: ReplayOptions): Promise<void>;

declare interface ReplayOptions {
    socketUrl?: string;
    proxy?: string;
    autoplay?: boolean;
}

declare type ScriptItem = {
    name?: string;
    src: string;
};

declare interface ScrollRecord {
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

declare interface WindowRecord {
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
