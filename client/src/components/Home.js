import React, { useState, useEffect } from "react";
import axios from "axios";

import Search from "./Search";
import Movie from "./Movie";


const Home = () => {
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        let mounted = true;

        setLoading(true);

        axios.get("/api/trending")
            .then(({ data: { response } }) => {
                if (mounted) {
                    setMovies(response);
                    setLoading(false);
                }
            });

        return () => {
            mounted = false;
        };
    }, []);

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
