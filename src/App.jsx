import React from "react";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";

import AppRouter from "./AppRouter.jsx";

import reducer from './reducers'
import { applyMiddleware, createStore, compose } from 'redux';

import middleware from 'redux-thunk'
import logger from 'redux-logger'
// import axios from 'axios'

// import { offline } from '@redux-offline/redux-offline';
// import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import * as localforage from 'localforage'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
// offlineConfig.persistOptions = { storage: localforage }

// const customConfig = {
//     ...offlineConfig,
//     effect: (effect, action) => { return axios.post(effect.url, action.payload && action.payload.content) }
// }

const persistConfig = {
    key: 'root',
    storage:localforage,
}
const initialState = {
    user: {
        theme: 'dark',
        onboard: true,
    }
}
const history = createBrowserHistory();

// const store = createStore(
//     reducer,
//     initialState,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//     compose(
//         applyMiddleware(middleware, logger),
//         offline(customConfig)
//     )
// );
const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(
    persistedReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(
        applyMiddleware(middleware, logger) 
    )
);

let persistor = persistStore(store);

const App = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AppRouter history={history} />
        </PersistGate>
    </Provider>
);

export default App;
