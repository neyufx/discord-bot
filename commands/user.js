const { Client, Collection, Intents, Channel } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
const { SlashCommandBuilder } = require('@discordjs/builders');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 6);
const db = require('../database/db.js');




module.exports = {
	name: 'user',
    description: 'Creer un utilisateur',
    execute(message,args){
        let arg1 = args[0];
        let arg2 = args[1];
        let arg3 = nanoid();
        message.guild.channels.create(arg3+'-'+arg1, {
            type: 'GUILD_TEXT',
            parent: '887267095493103637', // Créer channel dans la catégorie
            permissionOverwrites: [{
                id: message.guild.id,
                deny:['SEND_MESSAGES','VIEW_CHANNEL']
            },
            {
                id: message.mentions.users.first().id,
			    allow: ['SEND_MESSAGES','VIEW_CHANNEL',''],
            }
            
        ],
        message: 'https://cdn.discordapp.com/attachments/899991942761431070/899991945361907782/welcome.gif'
        }).then(channel => channel.send('https://cdn.discordapp.com/attachments/902945754111410246/902945756426686556/welcome.gif'))
        message.channel.send("Ajout de User : "+arg1+' '+arg2+' ID='+arg3);
        db.pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query(`insert into employees(nomRp,nomSteam,nomDossier) values("${arg1}","${arg2}","${arg3+'-'+arg1}")`, function (error, results, fields) {
            // When done with the connection, release it.
            connection.release();
            // Handle error after the release.
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
            });
          });
    }
};