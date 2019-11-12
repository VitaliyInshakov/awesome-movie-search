const config = require("../config"),
    request = require("request");

const tmdbApiKey = config.get("tmdbApiKey");
const tmdbApiURL = config.get("tmdbApiURL");

module.exports = (app) => {
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
};
