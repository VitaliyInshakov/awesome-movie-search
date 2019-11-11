const config = require("../config"),
    request = require("request");

const tmdbApiKey = config.get("tmdbApiKey");
const tmdbApiURL = config.get("tmdbApiURL");

/* GET home page. */
module.exports = (app) => {
    app.get("/api/search", function (req, res) {
        let searchquery = req.query.query;

        request(`${tmdbApiURL}${tmdbApiKey}&language=en-US&query=${searchquery}&page=1&include_adult=false`, (err, resp, body) => {
            let data = JSON.parse(body);

            res.send(data);
        });
    });
};
