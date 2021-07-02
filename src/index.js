import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import contactReducer from "./redux/reducers/contactReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();

const store = createStore(
  contactReducer,
  persistedState,
  composeWithDevTools()
);

store.subscribe(() => {
  saveState(store.getState());
});
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
