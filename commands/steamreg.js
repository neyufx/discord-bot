const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Collection, Intents } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
const { Guild } = require('discord.js');
const db = require('../database/db.js');

module.exports = {
    name: 'steamreg',
    description: 'Enregistrer le steam des employées',
    execute(message,args){
        if(args[0]){
            db.pool.getConnection(function(err, connection) {
                connection.query(`SELECT nomDossier FROM employees WHERE nomDossier = "${message.channel.name}"`, function(error, result,field) { 
                    if (result[0] !== undefined){
            connection.query(`UPDATE employees SET steamlink = "${args[0]}" WHERE nomDossier = "${message.channel.name}"`, function (error, results, fields) {
                // When done with the connection, release it.
                connection.release();
                // Handle error after the release.
                if (error) throw error;
                // Don't use the connection here, it has been returned to the pool.
                });
            } // fin if
            else{
                message.channel.send('Dossier invalide');
            }
            })
        })
    }
        else
        {
            message.channel.send('Il manque un paramètre !');
        }
        
    }
}