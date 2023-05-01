var express = require('express');

require('./config/connect');
const utilisateurRoutes = require('./routes/UtilisateurRoutes');
var app = express();

// Path: back-end\src\app.js
var cors = require('cors');
app.use(cors( { origin: 'http://localhost:3000' }));

// Path: back-end\src\app.js
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello World!');
}).listen(3001);