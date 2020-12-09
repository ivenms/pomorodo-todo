import {COMPLETE_TODO, CREATE_TODO, REMOVE_TODO, UPDATE_TODO, ADD_ERROR, REMOVE_ERROR, addError} from "./actions";

export const error = (state = null, action) => {
    const {type, payload} = action;
    switch (type) {
        case ADD_ERROR:
            return payload;
        case REMOVE_ERROR:
        default:
            return null;
    }
};

export const todos = (state = [], action) => {
    const {type, payload} = action;
    switch (type) {
        case CREATE_TODO: {
            console.log(payload);
            const nextId = Math.max(...state.map(item => item.id || 0)) + 1 || 1;
            return state.concat({
                "id": nextId,
                "title": payload.title || payload,
                "status": "active",
                "progress": 0,
                "estimate": payload.estimate || 0,
                "createdTime": Date.now(),
                "updatedTime": Date.now(),
                "category": payload.category || "default"
            });
        }
        case UPDATE_TODO: {
            const {id, data} = payload;
            return state.map(item => {
                if (item.id === id) {
                    item = {...item, ...data, "updatedTime": Date.now()};
                }
                return item;
            });
        }
        case COMPLETE_TODO: {
            const {id} = payload;
            return state.map(item => {
                if (item.id === id) {
                    item = {...item, "status": "completed", "progress": 100, "updatedTime": Date.now()};
                }
                return item;
            });
        }
        case REMOVE_TODO:
            return state.filter(item => item.id !== payload.id);
        default:
            return state;
    }
};
