import React from "react";
import { Link } from "react-router-dom";

import Search from "./Search";
import Movie from "./Movie";

const Results = (props) => {
    const { movies, errors } = props.history.location.state;

    return (
        <>
            <div className="top-block">
                <Link
                    to="/"
                    className="btn btn-success mb-3"
                >Back To Main</Link>
                <Search />
            </div>
            <h2 className="mb-3">Search Results</h2>
            <div className="row justify-content-center">
                {errors && !movies.length
                    ? <div className="not-found-movie w-100">{errors}</div>
                    : movies.map((movie, idx) => <Movie key={idx} movie={movie} />)
                }
            </div>
        </>
    );
};

export default Results;
