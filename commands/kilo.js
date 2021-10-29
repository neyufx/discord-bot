const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('../database/db.js');


module.exports = {
	name: 'kilo',
    description: 'Ajouts des kilos',
    execute(message,args){
        let arg1 = args[0];
        db.pool.getConnection(function(err, connection) {
          // Use the connection
          if (arg1 < 1000 && arg1 > -100){ // si nb de kilo renseigné < 1000
          connection.query(`SELECT SUM(quantite) as totalQuantite FROM dossiers WHERE numero = "${message.channel.id}"`, function (error, results, fields) {
            if(results[0]['totalQuantite'] == null)
            {
              var result = arg1;
            }else{var result = parseInt(results[0]['totalQuantite'])+parseInt(arg1)}
            message.reply("Ajout de "+arg1+" kilos pour un total de "+result+" kilos");
          // When done with the connection, release it.
          connection.release();
          // Handle error after the release.
          if (error) throw error;
          // Don't use the connection here, it has been returned to the pool.
          });
        }
        else{ // sinon
          message.channel.send('Kilos trop élevé !')
        }
          
        });
    }
};