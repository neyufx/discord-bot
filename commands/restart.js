const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Collection, Intents } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
const { Guild } = require('discord.js');
const db = require('../database/db.js');

module.exports = {
    name: 'restart',
    description: 'Redemarre le bot',
    execute(message,args){
        message.channel.send('Le bot redémarre..').then(()=>bot.destroy()).then(()=>bot.login(config.token));
    }
}