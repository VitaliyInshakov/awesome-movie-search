const config = require("../config"),
    request = require("request");

const tmdbApiKey = config.get("tmdbApiKey");
const trendingUrl = config.get("trendingUrl");

/* GET home page. */
module.exports = (app) => {
    app.get("/api/trending", function (req, res) {
        request(`${trendingUrl}/day?api_key=${tmdbApiKey}`, (err, resp, body) => {
            let data = JSON.parse(body);

            res.send(data);
        });
    });
};
