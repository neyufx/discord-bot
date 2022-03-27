const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, MessageEmbed, Intents } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
const { Guild } = require('discord.js');
const db = require('../database/db.js');

module.exports = {
    name: 'salon',
    description: 'écrit les salons important',
    execute(message,args){
        const embedMessage = new MessageEmbed()
            .setTitle('🚪 Salons important')
            .setDescription('<#790677077375320094>\n<#798277815325032498>\n<#902264707438764042>\n<#925423735262052442>')
            .setColor('#FEE75C')
            .setFooter({text:'© Brasserie'})
            .setTimestamp();
            message.channel.send({embeds: [embedMessage]});
    }
}