const Shutterstock_API = require("shutterstock-api");
const Random_Words = require("random-words");
const Random = require("random");

module.exports = (id, secret) => {
    Shutterstock_API.setBasicAuth(id, secret);
    api = new Shutterstock_API.ImagesApi();

    return new Promise((resolve, reject) => {
        api.searchImages({ query: "test" })
        .then(_ => {
            resolve();
        })
        .catch(err => {
            reject(err);
        })
    })
}

module.exports.GetRandomImage = (id, secret) => {
    Shutterstock_API.setBasicAuth(id, secret);
    var api = new Shutterstock_API.ImagesApi();

    return new Promise((resolve, reject) => {
        var q = Random_Words();
        api.searchImages({ query:  q })
        .then(ref => {
            resolve(ref.data[Random.int(0, ref.data.length - 1)].assets.preview.url, q);
        })
        .catch(err => {
            reject(err);
        });
    });
}

module.exports.GetRandomOldManImage = (id, secret) => {
    Shutterstock_API.setBasicAuth(id, secret);
    var api = new Shutterstock_API.ImagesApi();

    return new Promise((resolve, reject) => {
        api.searchImages({ query: "shirtless old men" })
        .then(ref => {
            resolve(ref.data[Random.int(0, ref.data.length - 1)].assets.preview.url);
        })
        .catch(err => {
            reject(err);
        });
    });
}