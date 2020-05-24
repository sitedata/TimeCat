import { WindowWatcher, RecordEvent, MouseRecord, DOMWatcher, FormElementWatcher, ScrollWatcher } from './types';
declare function windowWatcher(emit: RecordEvent<WindowWatcher>): void;
declare function scrollWatcher(emit: RecordEvent<ScrollWatcher>): void;
declare function mouseWatcher(emit: RecordEvent<MouseRecord>): void;
declare function DOMWatcher(emit: RecordEvent<DOMWatcher>): void;
declare function formElementWatcher(emit: RecordEvent<FormElementWatcher>): void;
export declare const watchers: {
    windowWatcher: typeof windowWatcher;
    scrollWatcher: typeof scrollWatcher;
    mouseWatcher: typeof mouseWatcher;
    DOMWatcher: typeof DOMWatcher;
    formElementWatcher: typeof formElementWatcher;
};
export {};
