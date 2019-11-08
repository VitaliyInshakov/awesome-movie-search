const express = require("express"),
    config = require("../config"),
    request = require("request");

const router = express.Router();
const tmdbApiKey = config.get("tmdbApiKey");
const trendingUrl = config.get("trendingUrl");

/* GET home page. */
router.get("/", function(req, res) {
    request(`${trendingUrl}/day?api_key=${tmdbApiKey}`, (err, resp, body) => {
        let data = JSON.parse(body);

        res.render("index", {
            movies: data.results,
        });
    });

});

module.exports = router;
