const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Collection, Intents } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
const { Guild } = require('discord.js');
const db = require('../database/db.js');

module.exports = {
    name: 'steam',
    description: 'Donne le steam de l\'employées',
    execute(message,args){
            db.pool.getConnection(function(err, connection) {
                connection.query(`SELECT steamlink FROM employees WHERE nomDossier = "${message.channel.name}"`, function(error, result,field) {
                    if (result[0]['steamlink'] !== null){
                        message.channel.send('Le lien steam : '+result[0]['steamlink'])
                    // When done with the connection, release it.
                    connection.release();
                    // Handle error after the release.
                    if (error) throw error;
                    // Don't use the connection here, it has been returned to the pool.
                } // fin if
            else{
                message.channel.send('Il n\'y a pas de steam enregistré pour cette employée !');
            }
            })
        })
    }
}