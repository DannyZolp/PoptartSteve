const axios = require("axios");

module.exports = () => {
    return new Promise((resolve, reject) => {
        axios.get("http://pebble-pickup.herokuapp.com/tweets/random")
        .then(ref => {
            resolve(ref.data.tweet);
        })
        .catch(err => {
            reject(err);
        });
    });
}