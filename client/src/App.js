import React from "react";
import { Route, Switch } from "react-router-dom";
// import axios from "axios";
//
// import Movie from "./components/Movie";
import Home from "./components/Home";
import Results from "./components/Results";

// import {
//     initialState,
//     reducer,
//     SEARCH_MOVIE_REQUEST,
//     SEARCH_MOVIE_SUCCESS,
//     SEARCH_MOVIE_FAILURE,
// } from "./reducer";
import "./App.css";

const App = () => {
    // const [state, dispatch] = useReducer(reducer, initialState);
    //
    // const search = searchValue => {
    //     dispatch({
    //         type: SEARCH_MOVIE_REQUEST,
    //     });
    //
    //     axios.post(`/api/search`, { searchValue })
    //         .then(({ data: { response, errors } }) => {
    //             if (response) {
    //                 dispatch({
    //                     type: SEARCH_MOVIE_SUCCESS,
    //                     payload: response,
    //                 });
    //             } else {
    //                 dispatch({
    //                     type: SEARCH_MOVIE_FAILURE,
    //                     error: errors,
    //                 });
    //             }
    //         });
    // };
    //
    // const { movies, error, loading } = state;
    //
    // const renderMovies = loading && !error ? (
    //     <i className="fas fa-spinner fa-spin fa-2x"/>
    // ) : error ? (
    //     <div className="error">{error}</div>
    // ) : movies && movies.length ? (
    //     movies.map((movie, idx) => (
    //         <Movie key={idx} movie={movie}/>
    //     ))
    // ) : (
    //     <div>Unfortunately we could not find anything by your request.</div>
    // );
    //
    // const renderTitle = error ? (
    //     "Something went wrong!!!"
    // ) : movies && movies.length ? (
    //     "Search Results"
    // ) : (
    //     "Nothing found!"
    // );

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
