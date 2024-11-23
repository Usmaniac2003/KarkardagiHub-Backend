const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Authentication required.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to the request
        next(); // Proceed to the next middleware or controller
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(403).json({ message: 'Invalid token.', error: error.message });
    }
};

module.exports = authenticate;