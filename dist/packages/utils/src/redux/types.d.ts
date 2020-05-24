export declare type Action = {
    type: string;
    data: State;
};
export declare type Reducer = (state: State, action?: Action) => State;
export declare type State = {
    [key: string]: any;
};
