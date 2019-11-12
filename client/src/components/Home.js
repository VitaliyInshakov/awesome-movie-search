import React from "react";

import Search from "./Search";

const Home = () => {
    return (
        <>
            <div className="top-block">
                <h1 className="title">Awesome Search Movies App</h1>
                <hr className="my-4"/>

                <Search search={() => null} />
            </div>
            <h2 className="mb-3">Trending movies</h2>

            <div className="row justify-content-center"></div>
        </>
    )
};

export default Home;
