const mysql = require('mysql');
require('dotenv').config();

    var pool = mysql.createPool({
        connectionLimit: 10,
        host: 'localhost', // 153.92.220.151
        user: 'brasserie', // u463335117_brasserie
        password: 'brasserie', // Neyufx99&
        database: 'brasserie', // u463335117_brasserie
    })
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.release();
        if (err) throw err;
    });

module.exports = { pool }; // Exporte la classe pour l'utiliser dans les autres 
