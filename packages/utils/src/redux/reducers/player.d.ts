import { State } from "../types";
export declare enum PlayerTypes {
    SPEED = "SPEED"
}
export declare type PlayerState = typeof PlayerTypes;
export default function playerReducer(state: State, action: {
    type: string;
    data: any;
}): any;
