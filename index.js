const express = require("express"); // Import express
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const apiRouter = require('./routes/apiRouter');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const meRoutes = require('./routes/meRoutes');
const User = require('./models/User');
const Chat = require('./models/Chat');
const userRoutes = require('./routes/userRoutes');
const http = require('http');
const socketIo = require('socket.io');
const activityLogRoutes = require('./routes/activityLogRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Configuring Server
const app = express(); // Initialize an Express application
const server = http.createServer(app);  // Create an HTTP server with Express
const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:5173', // Frontend URL (allow connections from this origin)
      methods: ['GET', 'POST'], // Allowed HTTP methods
      allowedHeaders: ['Content-Type'], // Allowed headers
      credentials: true, // Allow cookies
    },
  });  // Initialize Socket.io with the HTTP server

connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true,  // Allow cookies
}));
app.use(bodyParser.json());
app.use("/api", apiRouter);
app.use('/api/auth', authRoutes);
app.use('/api', meRoutes);
app.use("/tasks", taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/activity', activityLogRoutes);
app.use('/api/notifications', notificationRoutes);

app.get("/",(req,res) => {
    res.send("Welcome to the Movie Streaming API!");
});

// Socket.io Setup: Listening for new connections from the front-end
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for a message from the client (front-end)
    socket.on('sendMessage', async (data) => {
        try {
            // Check if user belongs to the correct team
            const user = await User.findById(data.userId);
            if (user.team_number !== data.team_number) {
                return socket.emit('error', 'User is not part of the team');
            }

            // Save the message to the database
            const newMessage = new Chat({
                user_id: data.userId,
                team_number: data.team_number,
                message: data.message
            });
            await newMessage.save();

            // Emit the message to other users in the same team
            io.to(data.team_number).emit('newMessage', newMessage);

        } catch (error) {
            console.error(error);
            socket.emit('error', 'Failed to send message');
        }
    });

    // Join a room based on the user's team number
    socket.on('joinTeam', (team_number) => {
        socket.join(team_number);
        console.log(`User joined team: ${team_number}`);
    });

    // Disconnect event
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Listening to the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
