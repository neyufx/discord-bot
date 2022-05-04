const { Client, Intents, MessageEmbed, MessageAttachment } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
const { SlashCommandBuilder } = require('@discordjs/builders');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 6);
const db = require('../database/db.js');

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}


module.exports = {
	name: 'user',
    description: 'Creer un utilisateur',
    execute(message,args){
        let arg1 = args[0];
        let arg2 = args[1];
        let arg3 = nanoid();

        const file = new MessageAttachment("./images/bienvenue.gif");
        const Salons = new MessageEmbed()
        .setTitle('✨ Bienvenue ✨')
        .setDescription('🚪 Salons important\n<#954147152823722024>\n<#954147198008958976>\n<#954147293836238908>\n<#954147077791830086>')
        .setImage('attachment://bienvenue.gif')
        .setColor('#E67E22')
        .setFooter({text:'© Ferme'})
        .setTimestamp();

        message.guild.channels.create(arg3+'-'+arg1, {
            type: 'GUILD_TEXT',
            parent: '935208101014032384', // Créer channel dans la catégorie
            permissionOverwrites: [{
                id: message.guild.id,
                deny:['SEND_MESSAGES','VIEW_CHANNEL']
            },
            {
                id: message.mentions.users.first().id,
			    allow: ['SEND_MESSAGES','VIEW_CHANNEL',''],
            }
            
        ],

        }).then(channel => channel.send({files: [file], embeds: [Salons]}))
        const embedMessage = new MessageEmbed()
            .setTitle('👨🏽‍🌾 Nouveau Employé 👨🏽‍🌾')
            .setDescription(`Nom et Prénom : ${capitalizeFirstLetter(arg1)}\nSteam : ${arg2}\nID Dossier : ${arg3}`)
            .setColor('#E67E22')
            .setFooter({text:'© Brasserie'})
            .setTimestamp();
        message.channel.send({embeds: [embedMessage]});
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