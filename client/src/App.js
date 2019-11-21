import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Results from "./components/Results";
import MovieDetails from "./components/MovieDetails";

import "./App.css";

const App = () => {
    return (
        <div className="App container">
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/search" component={Results}/>
                <Route path="/moviedetails/:movieId" component={MovieDetails}/>
            </Switch>
        </div>
    );
};

export default App;
