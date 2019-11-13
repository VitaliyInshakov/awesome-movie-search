import React, { useReducer, useEffect } from "react";
import axios from "axios";

import Search from "./Search";
import Movie from "./Movie";

import {
    initialState,
    reducer,
    SEARCH_MOVIE_SUCCESS,
} from "../reducer";

const Home = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        let mounted = true;

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

    const { movies } = state;

    return (
        <>
            <div className="top-block">
                <h1 className="title">Awesome Search Movies App</h1>
                <hr className="my-4"/>

                <Search search={() => null} />
            </div>
            <h2 className="mb-3">Trending movies</h2>

            <div className="row justify-content-center">
                {movies.map((movie, idx) => (
                    <Movie key={idx} movie={movie} />
                ))}
            </div>
        </>
    )
};

export default Home;
