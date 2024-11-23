// models/FavoriteFilm.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Import User model nếu cần liên kết

const FavoriteFilm = sequelize.define('FavoriteFilm', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users', // Tên bảng User
            key: 'id',
        },
    },
    movieId: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    media_type: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    img: {
        type: DataTypes.STRING, // Đổi `string` sang `STRING` của Sequelize
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING, // Đổi `string` sang `STRING`
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'favoriteFilm', // Tên bảng trong cơ sở dữ liệu
    timestamps: true, // Để sử dụng các cột `createdAt` và `updatedAt`
});

// Thiết lập liên kết nếu cần (optional)
FavoriteFilm.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = FavoriteFilm;
