import React from "react";

const Movie = ({ movie }) => {
    const imgURL = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;

    return (movie.poster_path != null ?
        <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="movie-block">
                <p>{movie.title}</p>
                <img src={imgURL} alt={movie.title}/>
                <span>
                    ({movie.release_date.split("-")[0]})
                </span>
            </div>
        </div>
        :  null
    );
};

export default Movie;
