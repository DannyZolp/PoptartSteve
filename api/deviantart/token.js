const axios = require("axios");

module.exports = (id, key) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.deviantart.com/oauth2/token?grant_type=client_credentials&client_id=${id}&client_secret=${key}`)
        .then(res => {
            resolve(res.data.access_token);
        })
        .catch(err => {
            reject(err);
        });
    });
}