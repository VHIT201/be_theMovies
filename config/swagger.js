const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Cấu hình Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node.js API Documentation',
            version: '1.0.0',
            description: 'API Documentation for Node.js project with PostgreSQL and Swagger',
        },
        servers: [
            {
                url: 'http://localhost:5000', // URL của server
                description: 'Local server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Định dạng token
                },
            },
        },
        security: [
            {
                bearerAuth: [], // Áp dụng bảo mật Bearer JWT cho toàn bộ API
            },
        ],
    },
    apis: ['./routes/*.js'], // Đường dẫn đến các file định nghĩa API
};

// Khởi tạo tài liệu Swagger
const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpec };
