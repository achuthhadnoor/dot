import React from "react";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";

import AppRouter from "./AppRouter.jsx"; 

import reducer from './reducers'
import { createStore } from "redux";

const initialState = {
    user:{
        theme:'dark',
        onboard:true,
    }
}
const history = createBrowserHistory();
const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const App = () => (
    <Provider store={store}>
        <AppRouter history={history} />
    </Provider>
);

export default App;
