let initState = {
    speed: null
};
export var PlayerTypes;
(function (PlayerTypes) {
    PlayerTypes["SPEED"] = "SPEED";
})(PlayerTypes || (PlayerTypes = {}));
export default function playerReducer(state, action) {
    if (!state) {
        state = initState;
    }
    if (!action) {
        return state;
    }
    const { type, data } = action;
    switch (type) {
        case PlayerTypes.SPEED:
            return {
                ...state,
                ...data
            };
        default:
            return state;
    }
}
