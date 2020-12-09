import {addError, updateTodo} from "./actions";

export const updateTask = (id, data) => async dispatch => {
    if (!id) {
        await dispatch(addError("Invalid operation!"));
        return false;
    } else {
        updateTodo(id, data);
    }
};
