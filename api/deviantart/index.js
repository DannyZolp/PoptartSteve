const axios = require("axios");
const Random = require("random");
const token = require("./token");

var previousDeviantID = "";

module.exports = (id, key) => {
    return new Promise((resolve, reject) => {
        token(id, key)
        .then(_ => {
            resolve();
        })
        .catch(err => {
            reject(err);
        });
    });
}

module.exports.getQuery = (id, key, query) => {
    return new Promise((resolve, reject) => {
        token(id, key).then(apikey => {
            if (previousDeviantID == "") {
                axios.get(`https://www.deviantart.com/api/v1/oauth2/browse/popular?q=${query}&timerange=alltime&limit=50&mature_content=true`, {
                    headers: {
                        "Authorization": `Bearer ${apikey}`
                    }
                }).then(ref => {
                    ref = ref.data.results[Random.int(0, ref.data.results.length - 1)];
                    previousDeviantID = ref.deviationid;
                    resolve(ref.preview.src);
                }).catch(err => {
                    reject(err);
                });
            } else {
                axios.get(`https://www.deviantart.com/api/v1/oauth2/browse/morelikethis/preview?seed=${previousDeviantID}&mature_content=true`, {
                    headers: {
                        "Authorization": `Bearer ${apikey}`
                    }
                }).then(ref => {
                    resolve(ref.data.more_from_da[Random.int(0, ref.data.more_from_da.length - 1)].preview.src);
                }).catch(err => {
                    reject(err);
                });
            }
        }).catch(err => {
            reject(err);
        });
    });
}