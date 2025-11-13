const express = require('express');
const cours = require('cors');
const path = require('path');
const PORT =  3000;

const app = express();
const db = require('./db');

app.use(cours());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});