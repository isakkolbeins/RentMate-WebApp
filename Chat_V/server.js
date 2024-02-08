const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname));

io.on('connection', function(socket) {
    console.log('A user connected');

    // Simulated user information (replace with actual user data)
    // const userInfo = {
    //     name: 'Grandma',
    //     avatar: './images/grandma.jpg'
    // };

    // Send user information to the client
    // socket.emit('user info', userInfo);

    // Handle setting user ID
    socket.on('set user id', function(userId) {
        socket.userId = userId;
        console.log('User ID set:', userId);
    });

    // Handle incoming messages
    socket.on('chat message', function(data) {
        console.log('Message received from user ID:', socket.userId);
        io.emit('chat message', { userId: socket.userId, message: data.message });
    });

    socket.on('disconnect', function() {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, function() {
    console.log(`Server is running on http://localhost:${PORT}`);
});
