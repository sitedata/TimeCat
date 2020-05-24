import { State } from '../types';
declare const initState: {
    frame: number;
    length: number;
    curTime: number;
    startTime: number;
    endTime: number;
};
export declare type ProgressState = typeof initState;
export declare enum ProgressTypes {
    FORWARD = "FORWARD",
    BACKWARD = "BACKWARD",
    INFO = "INFO"
}
export default function progressReducer(state: State, action?: {
    type: string;
    data: State;
}): State;
export {};
