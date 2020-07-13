import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';
// import Raven from 'raven-js';
// import stream from 'getstream';
// import StreamAnalytics from 'stream-analytics';

// import config from './config';

// Raven.config(config.sentry, {
// 	release: config.version,
// }).install();
 
// Raven.context(() => {
ReactDOM.render(<App />, document.getElementById("root"));
// });
serviceWorker.unregister();