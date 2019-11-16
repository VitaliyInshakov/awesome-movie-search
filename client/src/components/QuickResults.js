import React from "react";

const QuickResults = ({movies}) => {
    return (
        <div className="results-block">
            <div className="search-list">
                {movies.map((movie, idx) => {
                    const imgURL = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
                    return movie.poster_path ? (
                        <div className="search-item flex-md-nowrap" key={idx}>
                            <div className="item-img-wrap">
                                <img className="item-img" src={imgURL} alt={movie.title}/>
                            </div>
                            <div className="item-info">
                                <div className="item-info-header">
                                    {movie.title}
                                    <span className="ml-1">({movie.release_date.split("-")[0]})</span>
                                </div>
                                <p className="item-info-text">{movie.overview}</p>
                            </div>
                        </div>
                    ): null
                })}
            </div>
        </div>
    );
};

export default QuickResults;
