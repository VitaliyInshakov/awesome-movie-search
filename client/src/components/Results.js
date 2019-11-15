import React from "react";
import { Link } from "react-router-dom";

import Search from "./Search";

const Results = () => {
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
        </>
    );
};

export default Results;