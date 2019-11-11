import React, { useState } from "react";

const Search = (props) => {
    const [searchValue, setSearchValue] = useState("");

    const handleChangeSearchInput = (e) => {
        setSearchValue(e.target.value);
    };

    const callSearchFunction = (e) => {
        e.preventDefault();
        props.search(searchValue);

        setSearchValue("");
    };

    return (
        <form className="form-group" onSubmit={callSearchFunction} autoComplete="off">
            <div className="row">
                <div className="col-lg-10 col-sm-9 col-8">
                    <input
                        type="text"
                        className="form-control"
                        value={searchValue}
                        onChange={handleChangeSearchInput}
                        placeholder="Search Movies..."/>
                </div>
                <div className="col-lg-2 col-sm-3 col-4">
                    <button type="submit" className="btn btn-primary">
                        <i className="fas fa-search"/>
                        Search
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Search;