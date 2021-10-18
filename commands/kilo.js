const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('../database/db.js');


module.exports = {
	name: 'kilo',
    description: 'Additionne des kilos',
    execute(message,args){
        let arg1 = args[0];
        db.pool.getConnection(function(err, connection) {
          // Use the connection
          connection.query(`SELECT quantite,dossier,SUM(quantite) as totalQuantite FROM kilos WHERE dossier = "${message.channel.id}"`, function (error, results, fields) {
            if(results[0]['totalQuantite'] == null)
            {
              var result = arg1;
            }else{var result = results[0]['totalQuantite']}
            message.reply("Ajout de "+arg1+" kilos pour un total de "+(parseInt(result)+parseInt(arg1))+" kilos");
          // When done with the connection, release it.
          connection.release();
          // Handle error after the release.
          if (error) throw error;
          // Don't use the connection here, it has been returned to the pool.
          });
        });
    }
};