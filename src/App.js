import React from "react";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/Home";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";

const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route exact path="/add" component={() => <AddContact />}></Route>
        <Route exact path="/edit/:id" component={() => <EditContact />}></Route>
      </Switch>
    </div>
  );
};

export default App;
