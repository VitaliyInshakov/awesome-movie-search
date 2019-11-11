import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import Movie from "./components/Movie";
import Search from "./components/Search";

const App = () => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        axios.get("/api/trending")
            .then(response => console.log(response.data));
    });

    return (
        <div className="App container">
            <div className="top-block">
                <h1 className="title">Awesome Search Movies App</h1>
                <hr className="my-4"/>

                <Search search={(val) => console.log(val)} />
            </div>

            <h2 className="mb-3">Daily Trending</h2>
        </div>
    );
};

export default App;
