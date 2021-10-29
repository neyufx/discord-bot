const mysql = require('mysql');
require('dotenv').config();

    var pool = mysql.createPool({
        connectionLimit: 10,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        host: 3306,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    })
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.release();
        if (err) throw err;
    });

module.exports = { pool }; // Exporte la classe pour l'utiliser dans les autres 
