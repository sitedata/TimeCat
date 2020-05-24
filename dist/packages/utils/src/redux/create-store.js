import { PlayerTypes } from './reducers/player';
import { ProgressTypes } from './reducers/progress';
import { objectEquals } from '../tools/tool';
export function createStore(reducer, initState = {}) {
    let state = initState;
    const topics = {
        all: []
    };
    function subscribe(...args) {
        let type = 'all';
        let listener;
        if (typeof args[0] === 'string') {
            type = args[0];
            listener = args[1];
        }
        else {
            listener = args[0];
        }
        if (!topics[type]) {
            topics[type] = [];
        }
        topics[type].push(listener);
    }
    function dispatch(action) {
        const oldState = state;
        state = reducer(state, action);
        if (!action) {
            if (topics['all']) {
                topics['all'].forEach(listener => listener(state));
            }
            return;
        }
        const topicName = getTypeInTopics(action.type);
        if (topicName && topics[topicName]) {
            return topics[topicName].forEach(listener => {
                if (!objectEquals(state[topicName], oldState[topicName])) {
                    listener(state[topicName]);
                }
            });
        }
    }
    function getState() {
        return state;
    }
    function getTypeInTopics(type) {
        const topics = {
            player: Object.keys(PlayerTypes),
            progress: Object.keys(ProgressTypes)
        };
        for (let [key, enums] of Object.entries(topics)) {
            if (enums.includes(type)) {
                return key;
            }
        }
        return null;
    }
    return {
        subscribe,
        dispatch,
        getState
    };
}
