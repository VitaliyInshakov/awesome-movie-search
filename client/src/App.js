import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Results from "./components/Results";

import "./App.css";

const App = () => {
    return (
        <div className="App container">
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/search" component={Results}/>
            </Switch>
        </div>
    );
};

export default App;
