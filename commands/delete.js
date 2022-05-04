const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Collection, Intents } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
const { Guild } = require('discord.js');
const db = require('../database/db.js');

module.exports = {
    name: 'delete',
    description: 'Supprime n message',
    execute(message,args){
        let arg = args[0];
        if (arg){
            message.channel.messages.fetch({limit: arg}).then((messages) => {
                messages.forEach((message) => {
                    message.delete();
                });
                message.channel.send(`${arg} message(s) supprimé`);
            })
        }
    }
}