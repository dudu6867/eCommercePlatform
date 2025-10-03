import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BFF API',
      version: '1.0.0',
      description: 'API documentation for the BFF service',
    },
  },
  apis: ['./src/routes/*.js'], // Path to your route files for JSDoc comments
};

export const swaggerSpec = swaggerJSDoc(options);