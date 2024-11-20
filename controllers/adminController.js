const Movie = require('../models/Movie');
const User = require('../models/User');
const Review = require('../models/Review');

// Admin - Get all movies in the database
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find().sort({ releaseDate: -1 });  // Sort by latest release date
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies', error });
    }
};

// Admin - Add a new movie to the database
exports.addMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).json({ message: 'Movie added successfully', movie });
    } catch (error) {
        res.status(500).json({ message: 'Error adding movie', error });
    }
};

// Admin - Update an existing movie
exports.updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json({ message: 'Movie updated successfully', movie });
    } catch (error) {
        res.status(500).json({ message: 'Error updating movie', error });
    }
};

// Admin - Delete a movie from the database
exports.deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByIdAndDelete(id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting movie', error });
    }
};

// Admin - Get site statistics (e.g., total users, total movies)
exports.getStatistics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalMovies = await Movie.countDocuments();
        const totalReviews = await Review.countDocuments();  // Assuming a Review model exists

        res.json({
            totalUsers,
            totalMovies,
            totalReviews,
        });
    } catch (error) {
        console.error('Error fetching statistics:', error); // Log the error
        res.status(500).json({ message: 'Error fetching statistics', error: error.message });
    }
};

// Admin - Get trending genres based on user activity
exports.getTrendingGenres = async (req, res) => {
    try {
        const genreCounts = await Movie.aggregate([
            { $unwind: '$genre' },  // Split genre array into individual documents
            { $group: { _id: '$genre', count: { $sum: 1 } } },  // Group by genre and count
            { $sort: { count: -1 } },  // Sort by count in descending order
            { $limit: 10 },  // Limit to top 10 trending genres
        ]);

        res.json(genreCounts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching trending genres', error });
    }
};



