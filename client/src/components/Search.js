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

    const handleButtonClick = () => {
        history.push({
            pathname: "/search",
            search: `?query=${searchValue}`,
        });
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
        <form className="form-group" autoComplete="off">
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
                                    : <QuickResults movies={movies} />
                            }
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
