import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import Visualizer from "./components";

ReactDOM.render(
    <Provider store={store}>
        <Visualizer />
    </Provider>,
    document.getElementById("root")
);