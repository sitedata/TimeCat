const initState = {
    frame: 0,
    length: 0,
    curTime: 0,
    startTime: 0,
    endTime: 0
};
export var ProgressTypes;
(function (ProgressTypes) {
    ProgressTypes["FORWARD"] = "FORWARD";
    ProgressTypes["BACKWARD"] = "BACKWARD";
    ProgressTypes["INFO"] = "INFO";
})(ProgressTypes || (ProgressTypes = {}));
export default function progressReducer(state, action) {
    if (!state) {
        state = initState;
    }
    if (!action) {
        return state;
    }
    const { type, data } = action;
    switch (type) {
        case ProgressTypes.FORWARD:
            return {
                ...state,
                frame: data.frame,
                curTime: data.curTime
            };
        case ProgressTypes.BACKWARD:
            return {
                ...state,
                frame: data.frame
            };
        case ProgressTypes.INFO:
            return {
                ...state,
                ...data
            };
        default:
            return state;
    }
}
