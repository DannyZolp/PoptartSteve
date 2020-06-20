const Discord = require("discord.js");
const Random = require("random");
const Shutterstock = require("./shutterstock");
const DeviantArt = require("./deviantart");
const PickupLine = require("./pickupline");
const Filter = require("bad-words");

module.exports = (APITokens) => {
    // Allows for the testing of API Tokens
    return new Promise((resolve, reject) => {
        DeviantArt(APITokens[2], APITokens[3])
        .then(() => {
            Shutterstock(APITokens[0], APITokens[1])
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
        })
        .catch(err => {
            reject(err);
        });
    });
}

module.exports.ProcessText = (Message, Bot, APITokens) => {
    return new Promise((resolve, reject) => {
        if (Bot.user.tag !== Message.author.tag) {

            // Makes sure that our user doesn't use swear words! :)
            if (new Filter().isProfane(Message.content)) {
                resolve("Stop fucking swearing", false);
            }

            // If poptartsteve is recognized, it leaves a little message!
            if (Message.content.includes("poptartsteve")) {
                resolve("Wagga Whu!", false);
            }

            // If somebody types bruh, they will be getting a special surpise image!
            if (Message.content.includes("bruh")) {
                resolve(new Discord.MessageAttachment("https://i.imgur.com/IHyHvht.jpg"), true)
            }

            // If somebody wants a WACKY image, they can type "!wack" to get a random image from Shutterstock!
            if (Message.content.startsWith("!wack")) {
                Shutterstock.GetRandomImage(APITokens[0], APITokens[1])
                .then((uri, query) => {
                    console.log(uri);
                    resolve(new Discord.MessageAttachment(uri), true);
                })
                .catch(err => {
                    reject(err);
                });
            }

            // If the command is "!nsfw", get something <i>pretty</i> nsfw... (thanks deviantart)
            if (Message.content.startsWith("!nsfw") && Message.channel.nsfw) {
                DeviantArt.getQuery(APITokens[2], APITokens[3], "nsfw")
                .then(uri => {
                    resolve(new Discord.MessageAttachment(uri), true);
                })
                .catch(err => {
                    reject(err);
                });
            } else if (Message.content.startsWith("!nsfw") && !Message.channel.nsfw) {
                resolve("Hey fucker, no NSFW in the non-NSFW channel", false);
            }

            // Gets a random number for us to run calculations on
            rnd = Random.int(0, 1000);

            // 1 in 100 chance of you getting a pickup line
            if (rnd <= 10) {
                PickupLine()
                    .then(ref => {
                        resolve(ref, true);
                    })
                    .catch(err => {
                        reject(err);
                    });
            }

            // 1 in 50 chance of you getting an old man image
            if (rnd <= 20) {
                Shutterstock.GetRandomOldManImage(APITokens.ShutterID, APITokens.ShutterSecret)
                .then(uri => {
                    resolve(new Discord.MessageAttachment(uri), false);
                })
                .catch(err => {
                    reject(err);
                });
            }
        }
    });
}