const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'InkConnect API',
      version: '1.0.0',
      description: 'API documentation for InkConnect platform',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./server.js'], // Path to files with documentation comments
};

const specs = swaggerJsDoc(options);
module.exports = specs;
