import React, { useState, useCallback } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import debounce from "lodash/debounce";
import QuickResults from "./QuickResults";

const Search = () => {
    const [searchValue, setSearchValue] = useState("");
    const [movies, setMovies] = useState([]);
    const [errors, setErrors] = useState("");

    let history = useHistory();

    const handleButtonClick = (e) => {
        e.preventDefault();

        history.push({
            pathname: "/search",
            search: `?query=${searchValue}`,
            state: { movies, errors },
        });

        setMovies([]);
        setErrors("");
    };

    const handleMovieClick = (id) => {
        return () => {
            history.push(`/moviedetails/${id}`);

            setMovies([]);
            setSearchValue("");
        };
    };


    const debounceCallback = useCallback(
        debounce(value => {
            axios.post("/api/search", { searchValue: value })
                .then(({ data: { response, errors } }) => {
                    if (errors) {
                        setMovies([]);
                        setErrors("");
                    } else {
                        setMovies(response);
                        if (!response.length) setErrors("Unfortunately we could not find anything by your request");
                    }
                });
        }, 400),
        []
    );

    const onInputChangeHandler = ({ target: { value } }) => {
        setSearchValue(value);

        debounceCallback(value);
    };

    return (
        <form className="form-group" autoComplete="off" onSubmit={handleButtonClick}>
            <div className="row">
                <div className="col-lg-10 col-sm-9 col-8">
                    <input
                        type="text"
                        className="form-control"
                        value={searchValue}
                        onChange={onInputChangeHandler}
                        placeholder="Search Movies..."/>

                        <div className="response-container">
                            {!errors && !movies.length
                                ?  null
                                : errors && !movies.length
                                    ? <div className="not-found-movie">{errors}</div>
                                    : <QuickResults movies={movies} handleClick={handleMovieClick} />
                            }
                        </div>
                </div>
                <div className="col-lg-2 col-sm-3 col-4">
                    <button type="submit" className="btn btn-primary w-100">
                        <i className="fas fa-search mr-2"/>
                        Search
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Search;
