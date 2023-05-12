const express = require('express');
const cors = require('cors');
const utilisateurRoutes = require('./routes/UtilisateurRoutes');
const datacenterRoutes = require('./routes/DataCenterRoutes');
const serverRoutes = require('./routes/ServeurRoutes');
const rackRoutes = require('./routes/RackRoutes');
const podRoutes = require('./routes/PodRoutes');
require('dotenv').config();
require('./config/connect');

const app = express();
const port = process.env.PORT ;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));

// Routes
app.use('/users', utilisateurRoutes);
app.use('/datacenters', datacenterRoutes);
app.use('/serveurs', serverRoutes);
app.use('/racks', rackRoutes);
app.use('/pods', podRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
