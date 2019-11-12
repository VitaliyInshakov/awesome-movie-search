import React, { useReducer } from "react";
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

    const search = searchValue => {
        dispatch({
            type: SEARCH_MOVIE_REQUEST,
        });

        axios.post(`/api/search`, { searchValue })
            .then(({ data: { response, errors } }) => {
                if (response) {
                    dispatch({
                        type: SEARCH_MOVIE_SUCCESS,
                        payload: response,
                    });
                } else {
                    dispatch({
                        type: SEARCH_MOVIE_FAILURE,
                        error: errors,
                    });
                }
            });
    };

    const { movies, error, loading } = state;

    const renderMovies = loading && !error ? (
        <i className="fas fa-spinner fa-spin fa-2x"/>
    ) : error ? (
        <div className="error">{error}</div>
    ) : movies && movies.length ? (
        movies.map((movie, idx) => (
            <Movie key={idx} movie={movie}/>
        ))
    ) : (
        <div>Unfortunately we could not find anything by your request.</div>
    );

    const renderTitle = error ? (
        "Something went wrong!!!"
    ) : movies && movies.length ? (
        "Search Results"
    ) : (
        "Nothing found!"
    );

    return (
        <div className="App container">
            <div className="top-block">
                <h1 className="title">Awesome Search Movies App</h1>
                <hr className="my-4"/>

                <Search search={search} />
            </div>

            {!loading && movies
                ? <h2 className="mb-3">{renderTitle}</h2>
                : null
            }
            {movies ? <div className="row justify-content-center">{renderMovies}</div> : null}
        </div>
    );
};

export default App;
