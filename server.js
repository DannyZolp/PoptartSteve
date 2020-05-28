/*****
 * Package Decloration
*****/
const Discord = require('discord.js');
const Random = require('random');
const ShutterstockAPI = require("shutterstock-api");
require('dotenv').config();


/*****
 * Shutterstock API Stuff (and related functions)
*****/

// Shutterstock API Instantination
ShutterstockAPI.setBasicAuth(process.env.shutterAPI_ID, process.env.shutterAPI_Secret);
const imagesApi = new ShutterstockAPI.ImagesApi();
var shutterstockData;

// Collect data from Shutterstock API
imagesApi.searchImages({ "query": "old men" })
    .then(({ data }) => {
        shutterstockData = data;
    })
    .catch((error) => {
        console.error(error);
    });

// Easy way to get a random old man image, then returns the link
function GetOldManImage() {

    return shutterstockData[Random.int(0, shutterstockData.length - 1)].assets.preview.url;

}


/***** 
 * Bot Instantination & Functions
*****/

// Discord Bot Instantination
const bot = new Discord.Client();

// Add Bot Functions
bot.on('ready', () => {

    console.log(`Logged in as ${bot.user.tag}!`);

});

bot.on('message', msg => {

    if (msg.author.id === process.env.brandonID) { // If brandon sends a message,

        if (msg.attachments.array().length !== 0) { // If it's an image, say fuck you

            msg.channel.send("Fuck You, Brandon.");

        } else if (msg.toString().includes("fuck you")) { // If it includes fuck you, say fuck you harder

            msg.channel.send("Fuck You Harder!");

        } else if (Random.int(0, 4) === 0) { // Maybe send an old man image if all else fails.

            msg.reply(GetOldManImage().toString());

        }

    } else if (Random.int(0, 24) === 0) { // chance that the bot will say "Come here daddy"

        msg.reply("Come Here Daddy");

    } else if (Random.int(0, 9) === 0) { // chance that the bot will send an old man picture

        msg.reply(GetOldManImage().toString());

    }

});

// Create Bot
bot.login(process.env.discordJS_Secret);
