const swaggerAutogen = require('swagger-autogen')();


const doc = {
    info: {
        title: 'My API',
        description: 'cse341 API',
    },
    host: 'localhost:5500',
    schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);