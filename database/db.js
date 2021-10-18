const mysql = require('mysql');
require('dotenv').config();

    var pool = mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        user: process.env.DB_USER,
        host: 3306,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })

module.exports = { pool }; // Exporte la classe pour l'utiliser dans les autres 
