// Uses DotENV For Variable Storage
require("dotenv").config();
const Discord = require("discord.js");
const API = require("./api");
const log = require('simple-node-logger').createSimpleLogger("./latest.log");

// Get and Organize our API Tokens
var tokens = [
    process.env.shutterAPI_ID,
    process.env.shutterAPI_Secret,
    process.env.deviant_ID,
    process.env.deviant_Secret
]

console.log(tokens);

// Tests our API Tokens
API(tokens)
    .then(() => {
        // Discord Bot Creation
        const bot = new Discord.Client();

        // Add Bot Functions
        bot.on("ready", () => {
            console.log(`Logged in as ${bot.user.tag}!`);
        });

        bot.on("message", (msg) => {
            API.ProcessText(msg, bot, tokens)
            .then((ref, rep) => {
                if (rep) {
                    msg.reply(ref);
                    log.info(`Sent reply message, ${ref}`);
                } else {
                    msg.channel.send(ref);
                    log.info(`Sent message, ${ref}`);
                }
            })
            .catch(err => {
                msg.reply(`Something Broke, tell Danny: ${err}`);
                log.error(err);
            });
        });

        // Create Bot
        bot.login(process.env.discordJS_Secret);
    })
    .catch(err => {
        throw err;
    });