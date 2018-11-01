const SPOTIFY_HOST = "https://api.spotify.com/v1/";
const SPOTIFY_SEARCH = "search?query";
var request = require('request');


module.exports = {
    searchMusic(query, type) {
        //TODO: might need to put %20 in query
        let url = SPOTIFY_HOST + `search?q=${query}&type=${type}`;
        console.log(url);
        request(url, (err, res, body) => {
            console.log(err)
            console.log(res)
            console.log(body)
        });
    }
};
