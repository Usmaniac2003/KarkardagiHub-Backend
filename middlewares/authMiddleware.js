const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Extract token from cookies or Authorization header
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        console.error('Token not found in request');
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded); // Debugging decoded token
        req.user = decoded; // Attach user info to the request
        next();
    } catch (error) {
        console.error('Token Verification Error:', error.message);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
