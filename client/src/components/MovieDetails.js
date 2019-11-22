import React, { useEffect, useState } from "react";
import axios from "axios";

import Search from "./Search";

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
    }, [props.match.params.movieId]);

    return (
        <>
            <div className="top-block">
                <button
                    onClick={props.history.goBack}
                    className="btn btn-success mb-3"
                >Back</button>
                <Search />
            </div>
            <div className="row justify-content-cente">
                {loading && !movie
                    ? <i className="fas fa-spinner fa-spin fa-2x"/>
                    : movie
                        ? <div className="row w-100">
                            <div className="col-lg-8 col-md-8">
                                <h2 className="font-weight-bold mb-4">{movie.title}</h2>
                                <div className="d-flex justify-content-around">
                                    <div>{movie.runtime} min.</div>
                                    <div className="vhr"></div>
                                    <div>
                                        {movie.genres.map(({ name }, idx) => <span key={idx} className="mx-1">{name}</span>)}
                                    </div>
                                    <div className="vhr"></div>
                                    <div>{movie.release_date}</div>
                                </div>
                                <div className="d-flex justify-content-around align-items-start mt-4">
                                    <div>
                                        <h3>Company Credits</h3>
                                        {movie.production_companies.map(({name, logo_path}, idx) => {
                                            return !logo_path ? null
                                            : <div key={idx} className="my-3">
                                                <img src={`https://image.tmdb.org/t/p/w154/${logo_path}`} alt={name}/>
                                                <span className="ml-3">{name}</span>
                                            </div>
                                        })}
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <i className="fas fa-star fa-2x mr-2"></i>
                                        <div className="rating">
                                            {movie.vote_average}
                                            <span className="max-rating">/10</span>
                                            <div className="votes">{movie.vote_count}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-left my-3">
                                    <h2>Overview</h2>
                                    {movie.overview}
                                </div>
                                <hr/>
                                <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer">
                                    <button type="button" className="btn btn-primary btn-lg">View On IMDb</button>
                                </a>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title}/>
                            </div>
                        </div>
                        : null
                }
            </div>
        </>
    );
};

export default MovieDetails;