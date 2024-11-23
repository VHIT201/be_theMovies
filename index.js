const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const sequelize = require('./config/database'); // Kết nối cơ sở dữ liệu
const authenticateToken = require('./middleware/auth'); // Middleware kiểm tra JWT

// Import routes
const authRoutes = require('./routes/auth');
const favoriteFilmRoutes = require('./routes/favouriteFim');
const userRoutes = require('./routes/user');

// Import Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Load environment variables
dotenv.config();

// Khởi tạo ứng dụng
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cấu hình CORS
const corsOptions = {
    origin: '*', // Cho phép tất cả các domain. Có thể thay đổi thành danh sách domain cụ thể.
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Các phương thức được phép
    allowedHeaders: ['Content-Type', 'Authorization'], // Các header được phép
};
app.use(cors(corsOptions));

// Ghi log HTTP request
app.use(morgan('dev'));

// Swagger Config
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for the project',
        },
        servers: [
            {
                url: 'http://localhost:5000',
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
                bearerAuth: [], // Áp dụng Bearer Token cho toàn bộ API
            },
        ],
    },
    apis: ['./routes/*.js'], // Định nghĩa các API từ các route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Route mặc định
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API!' });
});

// API Routes
app.use('/api/auth', authRoutes); // Route xác thực người dùng

// Protected API Routes (Yêu cầu xác thực Bearer Token)
app.use('/api/favorite-films', authenticateToken, favoriteFilmRoutes); // Route quản lý phim yêu thích
app.use('/api/users', authenticateToken, userRoutes); // Route quản lý người dùng

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Kết nối cơ sở dữ liệu và khởi động server
(async () => {
    try {
        // Kiểm tra kết nối cơ sở dữ liệu
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        // Đồng bộ hóa model với cơ sở dữ liệu
        await sequelize.sync({ alter: true });

        // Khởi động server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
            console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
        process.exit(1); // Thoát nếu lỗi kết nối cơ sở dữ liệu
    }
})();
