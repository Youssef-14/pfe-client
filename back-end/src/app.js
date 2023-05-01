const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/connect');
const utilisateurRoutes = require('./routes/UtilisateurRoutes');

const app = express();
const port = process.env.PORT ;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));

// Routes
app.use('/users', utilisateurRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
