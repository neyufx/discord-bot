const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Intents, MessageEmbed } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
const { Guild } = require('discord.js');
const db = require('../database/db.js');
var curr = new Date; // get current date

module.exports = {
    name: 'classement',
    description: 'Donne le classement des employées',
    execute(message,args){
            db.pool.getConnection(function(err, connection) {
                var curr = new Date;
                curr.setHours( curr.getHours() + 1 ); // ajout d'1 heure pour être à jour sur l'heure locale
                var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay())).toISOString().split('T')[0];
                var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+7)).toISOString().split('T')[0];
                connection.query(`SELECT employees.nomRp,SUM(quantite) as totalKg
                FROM dossiers JOIN employees on employee_id = employees.id 
                WHERE date BETWEEN "${firstday}" AND "${lastday}"
                group by nom
                ORDER by totalKg desc
                LIMIT 3`, function(error, result,field) {
                    if (error) throw error;
                    else if (result){
                        let medals = ['🥇','🥈','🥉']
                        function dateFormat(date){
                            var today = new Date(date);
                            var dd = String(today.getDate()).padStart(2, '0');
                            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                            var yyyy = today.getFullYear();
                            return dd + '/' + mm + '/' + yyyy;
                        }
                        let i = 0;
                        function capitalizeFirstLetter(string) {
                            return string[0].toUpperCase() + string.slice(1);
                        }
                        const embedMessage = new MessageEmbed()
                        .setTitle(`🏆 Classement semaine du ${dateFormat(firstday)} au ${dateFormat(lastday)} 🏆`)
                        .setColor('#E67E22')
                        .setFooter({text:'© Ferme'})
                        .setTimestamp();
                        result.forEach(element => {
                            embedMessage.addField(`${medals[i++]}`+'. '+capitalizeFirstLetter(element['nomRp'].replace('-',' ')), `${element['totalKg']}kg`);
                        });
                        message.channel.send({embeds: [embedMessage]});
                } // fin if
                else{
                message.channel.send('Il n\'y a pas de classement cette semaine !');
                }
                // When done with the connection, release it.
                connection.release();
                // Handle error after the release.
                
                // Don't use the connection here, it has been returned to the pool.
            })
        })
    }
}