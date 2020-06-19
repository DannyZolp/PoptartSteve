const axios = require("axios");
const token = require("./token");

module.exports = (id, key) => {
    token(id, key);
    return new Promise((resolve, reject) => {
        if (token.token != "") {
            resolve(token.token);
        } else {
            reject("API Error");
        }
    });
}

module.exports.getQuery = (id, key, query) => {
    return new Promise((resolve, reject) => {
        token(id, key).then(apikey => {
            axios.get(`https://www.deviantart.com/api/v1/oauth2/browse/popular?q=${query}&timerange=alltime&limit=50&mature_content=true`, {
                headers: {
                    'Authorization': 'Bearer ' + apikey
                }
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(err);
        });
    });
}