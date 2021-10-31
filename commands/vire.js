const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('../database/db.js');

module.exports = {
    name: 'vire',
    description: 'Vire un employé',
    execute(message,args){
        let arg1 = args[0];
        message.channel.setParent('887269190883491880'); // id de la catégorie du channel vire
        
    }
}