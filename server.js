/*****
 * Package Decloration
 *****/
const Discord = require("discord.js");
const Random = require("random");
const ShutterstockAPI = require("shutterstock-api");
const randomWords = require("random-words");
const deviantnode = require("deviantnode");

require("dotenv").config();

// Shutterstock API Instatiation
ShutterstockAPI.setBasicAuth(
    process.env.shutterAPI_ID,
    process.env.shutterAPI_Secret
);
const imagesApi = new ShutterstockAPI.ImagesApi();

// Easy way to get an image from shutterstock
function GetImage(query, callback) {
    imagesApi
        .searchImages({
            query: query
        })
        .then((res) => {
            callback(new Discord.MessageAttachment(res.data[Random.int(0, res.data.length - 1)].assets.preview.url), query);
        })
        .catch((err) => {
            callback("There was an error (tell Danny): " + err);
        });
}

// Easy way to get an image from DeviantArt
function GetDeviation(query, amount, callback) {
    deviantnode
        .getTagDeviations(process.env.deviant_ID, process.env.deviant_Secret, {
            tag: query,
            limit: amount
        })
        .then((res) => {
            callback(new Discord.MessageAttachment(res.results[Random.int(0, res.results.length - 1)].preview.src), query);
        })
        .catch((err) => {
            callback("There was an error (tell Danny): " + err);
        });
}

/*****
 * Bot Instatiation & Functions
 *****/

// Discord Bot Instatiation
const bot = new Discord.Client();

// Add Bot Functions
bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", (msg) => {
    if (msg.author.tag === "PoptartSteve#0236") {
        return;
    }

    if (
        (msg.attachments.array().length !== 0) &
        (msg.author.id === process.env.brandonID)
    ) {
        // if brandon posts an image, says fuck you
        msg.channel.send("Fuck You, Brandon.");
    } else if (msg.toString().toUpperCase().includes("POPTARTSTEVE")) {
        msg.channel.send("Whagga Whu!");
    } else if (msg.toString().toUpperCase().includes("BRUH")) {
        msg.reply(
            new Discord.MessageAttachment("https://i.imgur.com/IHyHvht.jpg")
        );
    } else if (msg.toString() === "!wack") {
        // if a user types !wack sends a random shutterstock image
        GetImage(randomWords(), (res, query) => {
            msg.channel.send(query, res);
        });
    } else if (msg.toString() === "!cancer") {
        // if a user types !cancer sends a random deviantart image
        GetDeviation(randomWords(), 50, (res, query) => {
            msg.channel.send(query, res);
        });
    } else if (msg.toString() === "!nsfw") {
        // if a user types !nsfw sends an nsfw deviantart image
        GetDeviation("mature", 50, (res) => {
            msg.channel.send(res);
        })
    } else if (Random.int(0, 3500) === 0) {
        // 1 in 3500 chance a user gets an image of honey boo boo
        GetImage("Honey boo boo", (res, query) => {
            msg.channel.send(res);
        });
    } else if (Random.int(0, 1000000) === 0) {
        // 1 in 1000000 chance a user gets an image of a dildo
        GetImage("Dildo", (res, query) => {
            msg.channel.send(res);
        });
    } else if (Random.int(0, 200) === 0) {
        // 1 in 200 chance a user gets "Come Here Daddy"
        msg.channel.send("Come Here Daddy");
    } else if (Random.int(0, 100) === 0) {
        // 1 in 100 chance a user gets a shirtless man image from shutterstock
        GetImage("shirtless man", (res, query) => {
            msg.channel.send(res);
        });
    }
});

// Create Bot
bot.login(process.env.discordJS_Secret);