// apiRouter.js
const express = require('express');

// Import all individual route modules
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');
const apiRouter = express.Router();

// Mount each route module onto the apiRouter
apiRouter.use('/auth', authRoutes); 
apiRouter.use('/users', userRoutes);
apiRouter.use('/admin', adminRoutes);                // User profile and wishlist routes

module.exports = apiRouter;
