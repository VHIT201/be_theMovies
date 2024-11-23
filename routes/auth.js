const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API quản lý xác thực người dùng
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Tên người dùng"
 *               email:
 *                 type: string
 *                 description: "Email người dùng"
 *               password:
 *                 type: string
 *                 description: "Mật khẩu"
 *     responses:
 *       201:
 *         description: "Đăng ký thành công"
 *       400:
 *         description: "Người dùng đã tồn tại"
 *       500:
 *         description: "Lỗi máy chủ"
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: "Email người dùng"
 *               password:
 *                 type: string
 *                 description: "Mật khẩu"
 *     responses:
 *       200:
 *         description: "Đăng nhập thành công"
 *       400:
 *         description: "Email hoặc mật khẩu không hợp lệ"
 *       500:
 *         description: "Lỗi máy chủ"
 */
router.post('/login', login);

module.exports = router;
