import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Search = () => {
    const [searchValue, setSearchValue] = useState("");
    const [movies, setMovies] = useState([]);

    let history = useHistory();

    const handleChangeSearchInput = (e) => {
        const value = e.target.value;

        if (value) {
            axios.post("/api/search", { searchValue: value })
                .then(({ data: { response } }) => {
                    setMovies(response);
                });
        }

        setSearchValue(value);

        // setSearchValue("");
    };

    const handleButtonClick = () => {
        history.push({
            pathname: "/search",
            search: `?query=${searchValue}`,
        });
    };

    return (
        <form className="form-group" autoComplete="off">
            <div className="row">
                <div className="col-lg-10 col-sm-9 col-8">
                    <input
                        type="text"
                        className="form-control"
                        value={searchValue}
                        onChange={handleChangeSearchInput}
                        placeholder="Search Movies..."/>

                        <div className="response-container">
                            {movies.length ? (
                                <div className="results-block">
                                    <div className="search-list">
                                        {movies.map((movie) => {
                                            const imgURL = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
                                            return (
                                                <div className="search-item">
                                                    <img className="item-img" src={imgURL} alt={movie.title}/>
                                                    <div className="item-info">
                                                        <div className="item-info-header">
                                                            {movie.title}
                                                            <span className="ml-1">({movie.release_date.split("-")[0]})</span>
                                                        </div>
                                                        <p className="item-info-text">{movie.overview}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                </div>
                <div className="col-lg-2 col-sm-3 col-4">
                    <button type="submit" className="btn btn-primary" onClick={handleButtonClick}>
                        <i className="fas fa-search"/>
                        Search
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Search;
