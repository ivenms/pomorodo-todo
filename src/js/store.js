import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {todos, error} from "./redux/reducers";

const reducers = {
    todoList: todos,
    error
};

const persistConfig = {
    "key": "pomodoroList",
    storage,
    "stateReconciler": autoMergeLevel2
};

const rootReducers = combineReducers(reducers);
const persistentReducers = persistReducer(persistConfig, rootReducers);

export const configureStore = () => createStore(persistentReducers,
    composeWithDevTools(applyMiddleware(thunk))
);
