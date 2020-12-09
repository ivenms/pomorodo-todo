export const CREATE_TODO = 'CREATE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const ADD_ERROR = 'ADD_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

export const createTodo = (title, estimate, category) => ({
    type: CREATE_TODO,
    payload: {
        title,
        estimate,
        category
    }
});

export const updateTodo = (id, data) => ({
    type: UPDATE_TODO,
    payload: {
        id,
        data
    }
});

export const completeTodo = (id) => ({
    type: COMPLETE_TODO,
    payload: {
        id
    }
});

export const deleteTodo = (id) => ({
    type: REMOVE_TODO,
    payload: {
        id
    }
});

export const addError = (message) => ({
    type: ADD_ERROR,
    payload: message
});

export const removeError = () => ({
    type: REMOVE_ERROR,
    payload: null
});
