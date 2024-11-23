const FavoriteFilm = require('../models/favouriteFim'); // Sửa đường dẫn để đúng với tên file trong thư mục
const User = require('../models/User'); // Import model User

// Thêm một bộ phim vào danh sách yêu thích
const likeFilm = async (req, res) => {
    const { movieId, media_type, img, title } = req.body; // Không nhận userId từ body
    const userId = req.user.id; // Lấy userId từ token (req.user được gán bởi middleware)

    try {
        // Kiểm tra xem user có tồn tại không (nếu cần thiết)
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Kiểm tra xem bộ phim đã được thích chưa
        const existingLike = await FavoriteFilm.findOne({ where: { userId, movieId } });
        if (existingLike) {
            return res.status(400).json({ message: 'Film already liked' });
        }

        // Thêm phim vào danh sách yêu thích
        const newFavorite = await FavoriteFilm.create({
            userId, // Lấy từ token
            movieId,
            media_type,
            img,
            title,
        });

        return res.status(201).json({ message: 'Film liked successfully', data: newFavorite });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const getUserFavorites = async (req, res) => {
    const userId = req.user.id; // Lấy userId từ token đã giải mã trong middleware

    try {
        // Lấy danh sách phim yêu thích của người dùng
        const favoriteFilms = await FavoriteFilm.findAll({ where: { userId } });

        return res.status(200).json({ data: favoriteFilms });
    } catch (error) {
        console.error('Error fetching favorite films:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


// Cập nhật thông tin phim yêu thích
const updateFavoriteFilm = async (req, res) => {
    const { id } = req.params;
    const { mediaType, img, title } = req.body;

    try {
        const favoriteFilm = await FavoriteFilm.findByPk(id);
        if (!favoriteFilm) {
            return res.status(404).json({ message: 'Favorite film not found' });
        }

        favoriteFilm.mediaType = mediaType || favoriteFilm.mediaType;
        favoriteFilm.img = img || favoriteFilm.img;
        favoriteFilm.title = title || favoriteFilm.title;

        await favoriteFilm.save();

        return res.status(200).json({ message: 'Favorite film updated successfully', data: favoriteFilm });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Xóa phim khỏi danh sách yêu thích
const unlikeFilm = async (req, res) => {
    const { id } = req.params; // ID của bộ phim yêu thích cần xóa
    const userId = req.user.id; // ID của người dùng từ token

    try {
        // Tìm bộ phim yêu thích theo ID
        const favoriteFilm = await FavoriteFilm.findByPk(id);

        // Nếu không tìm thấy bộ phim yêu thích
        if (!favoriteFilm) {
            return res.status(404).json({ message: 'Favorite film not found' });
        }

        // Kiểm tra xem bộ phim này có thuộc về người dùng hiện tại không
        if (favoriteFilm.userId !== userId) {
            return res.status(403).json({ message: 'You are not authorized to unlike this film' });
        }

        // Xóa bộ phim yêu thích
        await favoriteFilm.destroy();

        return res.status(200).json({ message: 'Favorite film unliked successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


// Export các hàm controller
module.exports = {
    likeFilm,
    getUserFavorites,
    updateFavoriteFilm,
    unlikeFilm,
};
