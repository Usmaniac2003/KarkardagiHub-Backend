const errorHandler = (err, req, res, next) => {
    console.error(err.stack);  // Log the error stack for debugging

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : {},  // Show stack trace only in development
    });
};

module.exports = errorHandler;
