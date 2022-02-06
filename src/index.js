const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
const config = require('./config.json');
const path = require('path');
const db = require('../database/db.js');
const { channel } = require('diagnostics_channel');
const fetch = require('node-fetch');
const prefix = "!";


/* Va chercher les commandes dans le dossier /commands */
bot.commands = new Collection();
const dirPath = path.resolve(__dirname, '../commands');
const commandFiles = fs.readdirSync(dirPath).filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`../commands/${file}`);
    bot.commands.set(command.name, command);
}


/* Vérifie que le bot est connecté */
bot.on('ready', () => {
    console.log(`Connectez en tant que : ${bot.user.tag}!`);
    bot.user.setStatus("online");
    bot.user.setActivity("Calculer les primes");
  });


  /* Création de message */
bot.on('messageCreate', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const gerantRole = message.member.roles.cache.some(role => role.name === 'Gérants');// rôle
    const patronRole = message.member.roles.cache.some(role => role.name === 'Patron');// rôle
    const coPatronRole = message.member.roles.cache.some(role => role.name === 'Co-Patron');// rôle
    /* Si la commande user */
    if(gerantRole){
    if(command === 'user'){ // Commande !user <nomrp> <nomsteam> @taguser
        let arg1 = args[0];
        let arg2 = args[1];
        let arg3 = args[2];
        if(arg1 && arg2 && arg3)
        {
            bot.commands.get('user').execute(message,args);
        }
    }else if (command === 'kilo'){
        let arg1 = args[0];
        if (arg1){
            if(arg1 < 1001 && arg1 > -501){
            bot.commands.get('kilo').execute(message,args);
            db.pool.getConnection(function(err, connection) {
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today = yyyy + '/' + mm + '/' + dd;
                // Use the connection
                connection.query(`SELECT id FROM employees WHERE nomDossier = "${message.channel.name}"`, function(error, result,field) {  
                    if (result[0] !== undefined){
                connection.query(`insert into dossiers(numero,quantite,nom,date,employee_id) values("${message.channel.id}","${arg1}","${message.channel.name}","${today}","${result[0]['id']}")`, function (error, results, fields) {
                // When done with the connection, release it.
                connection.release();
                // Handle error after the release.
                if (error) throw error;
                // Don't use the connection here, it has been returned to the pool.
                });
            }
            else{
                message.channel.send('Mauvais channel !')
            }
                });
              });
            }
            else{
                message.channel.send('Quantité de kilos trop élevé !')
            }
        }
    }else if (command === 'vire'){
        const Discord = require("discord.js");
        bot.commands.get('vire').execute(message,args);
        message.channel.send("https://cdn.discordapp.com/attachments/899310160672067586/899310182075609108/vire.gif");
        var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today = yyyy + '/' + mm + '/' + dd;
                db.pool.getConnection(function(err, connection) {
                    var today = new Date();
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = today.getFullYear();
                    today = yyyy + '/' + mm + '/' + dd;
                    // Use the connection     
                    connection.query(`UPDATE employees SET isViree = "${today}" WHERE nomDossier = "${message.channel.name}"`, function (error, results, fields) {
                    // When done with the connection, release it.
                    connection.release();
                    // Handle error after the release.
                    if (error) throw error;
                    // Don't use the connection here, it has been returned to the pool.
                    });
        });
    }
    else if (command === 'semaine')
    {
        const Discord = require("discord.js");
        bot.commands.get('semaine').execute(message,args);
        const channel = bot.channels.cache.get('887267095493103637'); // id catégorie
        channel.children.forEach(e => {
            if(e.name !== undefined)
            {
                const channel01 = bot.channels.cache.get(e.id);
                channel01.send('https://cdn.discordapp.com/attachments/892822047405768714/901595903666847744/newweek.gif')
            }
        })
        //message.channel.send(`Le bot redémarre...`).then(process.exit(0));
        // ()=>bot.destroy()).then(()=>bot.login(config.token) 'dans le then'
    }
    else if (command === 'pause')
    {
        const Discord = require("discord.js");
        bot.commands.get('pause').execute(message,args);
    }
    else if (command === 'prime')
    {
        const Discord = require("discord.js");
        bot.commands.get('prime').execute(message,args);
        message.channel.send('https://cdn.discordapp.com/attachments/899030341338169364/901738822696570931/prime.gif');
        db.pool.getConnection(function(err, connection) {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = yyyy + '/' + mm + '/' + dd;
            // Use the connection
            connection.query(`SELECT id FROM employees WHERE nomDossier = "${message.channel.name}"`, function(error, result,field) {  
                if (result[0] !== undefined){
            connection.query(`insert into primes(date,employee_id) values("${today}","${result[0]['id']}")`, function (error, results, fields) {
            // When done with the connection, release it.
            connection.release();
            // Handle error after the release.
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
            });
        }
    })
})
    }
    else if (command === 'carte')
    {
        message.channel.send({files: ["./images/carte.png"]});
    }
    else if (command === 'commandes')
    {
        message.channel.send('!user <nomrp> <nomsteam> @taguser\n!kilo <nbkilos>\n!vire\n!pause\n!semaine\n!prime\n!carte\n!steamreg <lien compte steam>\n!steam\n!classement\n!restart\n!salon\n!classement10')
    }
    else if (command === 'steamreg')
    {
        bot.commands.get('steamreg').execute(message,args);
    }
    else if (command === 'steam')
    {
        bot.commands.get('steam').execute(message,args);
    }
    else if (command === 'classement')
    {
        if(patronRole || coPatronRole){
        bot.commands.get('classement').execute(message,args);
        }
    }
    else if (command === 'salon')
    {
        salons = ['<#790677077375320094>','<#798277815325032498>','<#902264707438764042>','<#925423735262052442>'];
        salons.forEach(element => {
            message.channel.send(element);
        })
        console.log(salons);
        bot.commands.get('salon').execute(message,args);
    }
    else if (command === 'classement10')
    {
        if(patronRole || coPatronRole){
        bot.commands.get('classement10').execute(message,args);
        }
    }
    else if (command === 'restart'){
        fetch('https://api.heroku.com/apps/brasserie-bot/dynos', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/vnd.heroku+json; version=3',
                'Authorization': 'Bearer 6cc086cb-3ce2-4991-9c8d-349a6088e87e'
            }
        }).then(response => response.json())
        .then(response => console.log(response));
    }
}

});


/* Affiche les erreurs dans la console */
bot.on('error', console.error);

/* Connecte le bot avec le token fourni en paramètre */
bot.login(process.env.TOKEN); // config.token