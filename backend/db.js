const db = require('mysql2');
require('dotenv').config();
const connection = db.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }  
    else{
        console.log('Connected to the database.');
    }
});

module.exports = connection;