const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // Lấy token từ header Authorization
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Kiểm tra định dạng Bearer token
    const token = authHeader.split(' ')[1]; // Token phải có định dạng "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'Invalid token format, authorization denied' });
    }

    try {
        // Giải mã token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Gán thông tin user từ token vào request
        next(); // Tiếp tục xử lý yêu cầu
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = auth;
