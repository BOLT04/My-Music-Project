let api = require('../api/spotifyWebApi');

module.exports = {
    searchMusic(name, type) {
        api.searchMusic(name, type);
    }
};