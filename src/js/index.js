import React from "react";
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {configureStore} from "./store";
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/lib/integration/react";
import "../templates/assets/css/material-dashboard-react.css";

const store = configureStore();
const persist = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<div>Loading....</div>}
            persistor={persist}>
            <App/>
        </PersistGate>
    </Provider>
    , document.getElementById("app"));
