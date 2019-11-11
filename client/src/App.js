import React, { useReducer, useEffect } from "react";
import axios from "axios";

import Movie from "./components/Movie";
import Search from "./components/Search";

import {
    initialState,
    reducer,
    SEARCH_MOVIE_REQUEST,
    SEARCH_MOVIE_SUCCESS,
    SEARCH_MOVIE_FAILURE,
} from "./reducer";
import "./App.css";

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // useEffect(() => {
    //     axios.get("/api/trending")
    //         .then(response => console.log(response.data));
    // });
    const search = searchValue => {
        dispatch({
            type: SEARCH_MOVIE_REQUEST,
        });

        axios.get(`/api/search/?query=${searchValue}`)
            .then(response => {
                if (response.data.results) {
                    dispatch({
                        type: SEARCH_MOVIE_SUCCESS,
                        payload: response.data.results,
                    });
                } else {
                    dispatch({
                        type: SEARCH_MOVIE_FAILURE,
                        error: response.data.errors || response.data.status_message,
                    });
                }
            });
    };

    const { movies, error, loading } = state;

    const renderMovies = loading && !error ? (
        <i className="fas fa-spinner fa-spin fa-2x"/>
    ) : error ? (
        <div>
            <h3>Something went wrong!!!</h3>
            <div className="error">{error}</div>
        </div>
    ) : (
        movies.map((movie, idx) => (
            <Movie key={idx} movie={movie}/>
        ))
    );

    return (
        <div className="App container">
            <div className="top-block">
                <h1 className="title">Awesome Search Movies App</h1>
                <hr className="my-4"/>

                <Search search={search} />
            </div>

            {movies.length && !loading && !error
                ? <h2 className="mb-3">Search Results</h2>
                : null
            }
            <div className="row justify-content-center">{renderMovies}</div>
        </div>
    );
};

export default App;
