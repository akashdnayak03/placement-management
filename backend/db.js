const db = require('mysql2');
const connection = db.createConnection({
    host:'localhost',
    user:'root',
    password:'akashdnayak',
    database:'placement'
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