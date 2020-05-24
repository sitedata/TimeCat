export { PlayerTypes, PlayerState } from './reducers/player';
export { ProgressTypes, ProgressState } from './reducers/progress';
export declare const reduxStore: {
    subscribe: {
        (type: string, listener: (state: import("./types").State) => void): void;
        (listener: (state: import("./types").State) => void): void;
    };
    dispatch: (action: import("./types").Action) => void;
    getState: () => import("./types").State;
};
