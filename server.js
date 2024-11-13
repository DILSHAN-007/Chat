const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Broadcast the message to all connected clients
    });

    socket.on('chat image', (msg) => {
        io.emit('chat image', msg); // Broadcast the image to all connected clients
    });

    socket.on('typing', (name) => {
        socket.broadcast.emit('typing', name); // Let others know the user is typing
    });

    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing'); // Let others know the user stopped typing
    });

    socket.on('delete message', (msg) => {
        io.emit('delete message', msg); // Notify others that a message was deleted
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
