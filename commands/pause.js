const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Collection, Intents } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
const { Guild } = require('discord.js');
const db = require('../database/db.js');

module.exports = {
    name: 'pause',
    description: 'Pause employée',
    execute(message,args){
        let arg1 = args[0];
        message.channel.setParent('903351714751578143'); // id de la catégorie du channel pause
    }
}