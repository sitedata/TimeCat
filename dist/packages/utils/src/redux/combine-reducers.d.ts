import { Reducer, Action, State } from './types';
export declare function combineReducers(reducers: {
    [key: string]: Reducer;
}): (state: State, action?: Action | undefined) => State;
