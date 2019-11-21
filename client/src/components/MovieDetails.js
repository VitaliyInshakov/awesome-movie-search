import React, { useEffect, useState } from "react";
import axios from "axios";

import Search from "./Search";
import Movie from "./Home";

const MovieDetails = (props) => {
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState(null);
    const [errors, setErrors] = useState("");

    useEffect( () => {
        setLoading(true);

        axios.get(`/api/moviedetails/${props.match.params.movieId}`)
            .then(({ data: { response, errors } }) => {
                if (errors) {
                    setMovie(null);
                    setLoading(false);
                    setErrors(errors);
                } else {
                    setMovie(response);
                    setLoading(false);
                }
            });
    }, []);

    return (
        <>
            <div className="top-block">
                <button
                    onClick={props.history.goBack}
                    className="btn btn-success mb-3"
                >Back</button>
                <Search />
            </div>
            <div className="row justify-content-center">
                {loading
                    ? <i className="fas fa-spinner fa-spin fa-2x"/>
                    : <div>loaded</div>
                }
            </div>
        </>
    );
};

export default MovieDetails;