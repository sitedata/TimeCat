import { State, Reducer, Action } from './types';
export declare function createStore(reducer: Reducer, initState?: State): {
    subscribe: {
        (type: string, listener: (state: State) => void): void;
        (listener: (state: State) => void): void;
    };
    dispatch: (action: Action) => void;
    getState: () => State;
};
