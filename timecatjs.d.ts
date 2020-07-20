
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

declare interface InfoData {
    doctype: DocumentType;
    origin: string;
    pathname: string;
    width: number;
    height: number;
    scrollLeft: number;
    scrollTop: number;
    frameId: number | null;
}

declare interface LocationRecord {
    type: RecordType.LOCATION;
    data: LocationRecordData;
    time: string;
}

declare interface LocationRecordData {
    path?: string;
    hash?: string;
    contextNodeId: number;
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

declare type RecordData = FormElementRecord | DOMRecord | MouseRecord | WindowRecord | ScrollRecord | AudioRecord | NONERecord | LocationRecord;

declare interface RecorderOptions {
    sampleBits: 8 | 16;
    sampleRate: 8000 | 16000 | 22050 | 24000 | 44100 | 48000;
    channelCount: 1 | 2;
}

declare interface RecordOptions {
    context?: Window;
    audio?: boolean;
    emitter?: (data: RecordData | SnapshotData, db: any) => void;
}

declare enum RecordType {
    'SNAPSHOT' = "SNAPSHOT",
    'WINDOW' = "WINDOW",
    'SCROLL' = "SCROLL",
    'MOUSE' = "MOUSE",
    'DOM_UPDATE' = "DOM_UPDATE",
    'FORM_EL_UPDATE' = "FORM_EL_UPDATE",
    'LOCATION' = "LOCATION",
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
    id: number | null;
    top: number;
    left: number;
}

declare interface SnapshotData {
    type: RecordType.SNAPSHOT;
    data: {
        vNode: VNode;
    } & InfoData;
    time: string;
}

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
    id: number | null;
    width: number;
    height: number;
}

export { }
