// apiRouter.js
const express = require('express');

// Import all individual route modules
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

const apiRouter = express.Router();

// Mount each route module onto the apiRouter
apiRouter.use('/auth', authRoutes); 
apiRouter.use('/users', userRoutes);                // User profile and wishlist routes

module.exports = apiRouter;
