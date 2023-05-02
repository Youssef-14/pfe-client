const express = require('express');
const cors = require('cors');
const utilisateurRoutes = require('./routes/UtilisateurRoutes');
const datacenterRoutes = require('./routes/DatacenterRoutes');
const serverRoutes = require('./routes/ServeurRoutes');
const rackRoutes = require('./routes/RackRoutes');
const podRoutes = require('./routes/PodRoutes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
require('./config/connect');

const app = express();
const port = process.env.PORT ;

// Import the swaggerOptions object from swaggerConfig.js
const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "My API",
        version: "1.0.0",
        description: "API for my app",
        contact: {
          name: "Your Name",
          email: "youremail@example.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3001",
          description: "Development server",
        },
      ],
    },
    apis: ["./routes/ServeurRoutes.js"],
  };

// Initialize swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));

// Set up the Swagger UI middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/users', utilisateurRoutes);
app.use('/datacenters', datacenterRoutes);
app.use('/servers', serverRoutes);
app.use('/racks', rackRoutes);
app.use('/pods', podRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
