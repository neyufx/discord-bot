const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Collection, Intents } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
const { Guild } = require('discord.js');
const db = require('../database/db.js');
var curr = new Date; // get current date

module.exports = {
    name: 'classement10',
    description: 'Donne le classement des employées',
    execute(message,args){
            db.pool.getConnection(function(err, connection) {
                var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
                var last = first + 6; // last day is the first day + 6
                var firstdate = new Date(curr.setDate(first)).toISOString().slice(0, 10);
                var lastdate = new Date(curr.setDate(curr.getDate()+6)).toISOString().slice(0, 10);
                connection.query(`SELECT employees.nomRp,SUM(quantite) as totalKg
                FROM dossiers JOIN employees on employee_id = employees.id 
                WHERE date BETWEEN "${firstdate}" AND "${lastdate}"
                group by nom
                ORDER by totalKg desc
                LIMIT 10`, function(error, result,field) {
                    if (error) throw error;
                    else if (result){
                        function dateFormat(date){
                            var today = new Date(date);
                            var dd = String(today.getDate()).padStart(2, '0');
                            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                            var yyyy = today.getFullYear();
                            return dd + '/' + mm + '/' + yyyy;
                        }
                        function capitalizeFirstLetter(string) {
                            return string[0].toUpperCase() + string.slice(1);
                        }
                        message.channel.send(`Classement semaine du ${dateFormat(firstdate)} au ${dateFormat(lastdate)} @here :`)
                        let i = 1;
                        result.forEach(element => {
                            message.channel.send(`${i++}`+'. '+capitalizeFirstLetter(element['nomRp'].replace('-',' '))+' : '+element['totalKg']+'kg');
                        });  
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