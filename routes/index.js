const config = require("../config"),
    request = require("request");

const tmdbApiKey = config.get("tmdbApiKey");
const tmdbApiURL = config.get("tmdbApiURL");
const trendingUrl = config.get("trendingUrl");

module.exports = (app) => {
    app.get("/api/trending", function (req, res) {
        request(
            `${trendingUrl}${tmdbApiKey}`,
            (err, resp, body) => {
                const data = JSON.parse(body);

                res.send({
                    status: resp.statusCode,
                    errors: data.errors || data.status_message || null,
                    response: data.results || null,
                });
            });
    });

    app.post("/api/search", function (req, res) {
        const { searchValue } = req.body;

        request(
            `${tmdbApiURL}${tmdbApiKey}&language=en-US&query=${encodeURIComponent(searchValue)}&page=1&include_adult=false`,
            (err, resp, body) => {
                const data = JSON.parse(body);

                res.send({
                    status: resp.statusCode,
                    errors: data.errors || data.status_message || null,
                    response: data.results || null,
            });
        });
    });

    app.get("/api/moviedetails/:movieId", function (req, res) {
        request(`https://api.themoviedb.org/3/movie/${req.params.movieId}?api_key=${tmdbApiKey}&language=en-US`,
            (err, resp, body) => {
                const data = JSON.parse(body);

                res.send({
                    status: resp.statusCode,
                    errors: data.errors || data.status_message || null,
                    response: data || null,
                });
            });
    });
};
