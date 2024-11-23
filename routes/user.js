const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 */
router.get('/', UserController.getAllUsers);

module.exports = router;
