const express = require('express');
const router = express.Router();
const {
    likeFilm,
    getUserFavorites,
    updateFavoriteFilm,
    unlikeFilm,
} = require('../controllers/favouriteFimController');
const auth = require ('../middleware/auth')
/**
 * @swagger
 * tags:
 *   name: FavoriteFilms
 *   description: API quản lý phim yêu thích của người dùng
 */

/**
 * @swagger
 * /api/favorite-films/like:
 *   post:
 *     summary: Thêm một bộ phim vào danh sách yêu thích
 *     tags: [FavoriteFilms]
 *     security:
 *       - bearerAuth: [] # Yêu cầu xác thực Bearer Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               movieId:
 *                 type: string
 *               media_type:
 *                 type: string
 *               title:
 *                 type: string
 *               img:
 *                 type: string
 *     responses:
 *       201:
 *         description: "Bộ phim được thêm thành công vào danh sách yêu thích"
 *       401:
 *         description: "Unauthorized"
 *       500:
 *         description: "Lỗi máy chủ"
 */
router.post('/like', likeFilm);

/**
 * @swagger
 * /api/favorite-films:
 *   get:
 *     summary: Lấy danh sách tất cả các phim yêu thích
 *     tags: [FavoriteFilms]
 *     description: Lấy danh sách tất cả các bộ phim yêu thích từ cơ sở dữ liệu.
 *     responses:
 *       200:
 *         description: Danh sách tất cả phim yêu thích được trả về thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Lỗi máy chủ khi xử lý yêu cầu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi
 *                   example: "Internal server error"
 */

router.get('/', auth, getUserFavorites); // Yêu cầu xác thực token



/**
 * @swagger
 * /api/favorite-films/{id}:
 *   put:
 *     summary: Cập nhật thông tin phim yêu thích
 *     tags: [FavoriteFilms]
 *     security:
 *       - bearerAuth: [] # Yêu cầu xác thực Bearer Token
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: "ID của bộ phim yêu thích"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               media_type:
 *                 type: string
 *                 description: "Loại phương tiện (movie hoặc tv)"
 *               img:
 *                 type: string
 *                 description: "URL hình ảnh mới của bộ phim"
 *               title:
 *                 type: string
 *                 description: "Tên mới của bộ phim"
 *     responses:
 *       200:
 *         description: "Cập nhật thông tin thành công"
 *       401:
 *         description: "Unauthorized"
 *       500:
 *         description: "Lỗi máy chủ"
 */
router.put('/:id', updateFavoriteFilm);

/**
 * @swagger
 * /api/favorite-films/{id}:
 *   delete:
 *     summary: Xóa phim khỏi danh sách yêu thích
 *     tags: [FavoriteFilms]
 *     security:
 *       - bearerAuth: [] # Yêu cầu xác thực Bearer Token
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: "ID của bộ phim yêu thích"
 *     responses:
 *       200:
 *         description: "Xóa thành công"
 *       401:
 *         description: "Unauthorized"
 *       500:
 *         description: "Lỗi máy chủ"
 */
router.delete('/:id', unlikeFilm);

module.exports = router;
