import React, { useReducer, useEffect } from "react";
import axios from "axios";

import Search from "./Search";
import Movie from "./Movie";

import {
    initialState,
    reducer,
    SEARCH_MOVIE_SUCCESS,
    SEARCH_MOVIE_REQUEST,
} from "../reducer";

const Home = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        let mounted = true;

        dispatch({
            type: SEARCH_MOVIE_REQUEST,
        });

        axios.get("/api/trending")
            .then(({ data: { response } }) => {
                if (mounted) {
                    dispatch({
                        type: SEARCH_MOVIE_SUCCESS,
                        payload: response,
                    });
                }
            });

        return () => {
            mounted = false;
        };
    }, []);

    const { movies, loading } = state;

    return (
        <>
            <div className="top-block">
                <h1 className="title text-center">Awesome Search Movies App</h1>
                <hr className="my-4"/>

                <Search />
            </div>
            <h2 className="mb-3">Trending movies</h2>

            <div className="row justify-content-center">
                {loading
                    ? <i className="fas fa-spinner fa-spin fa-2x"/>
                    : movies.map((movie, idx) => <Movie key={idx} movie={movie} />)
                }
            </div>
        </>
    )
};

export default Home;
