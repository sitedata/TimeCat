import { RecordData } from './types';
import { IndexedDBOperator } from "../../utils/src";
export declare function record(fn?: (data: RecordData, db: IndexedDBOperator) => void): {
    unsubscribe: () => void;
};
