const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('index.html'));

io.on('connection', socket => {
    console.log('A user connected:', socket.id);

    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = 3000;
http.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
