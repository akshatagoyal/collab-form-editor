const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

let formData = {
  title: '',
  description: '',
  category: '',
};
let locks = {}; // { fieldName: socket.id }

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.emit('initial_data', formData);

  socket.on('field_change', ({ field, value }) => {
    formData[field] = value;
    socket.broadcast.emit('field_update', { field, value });
  });

  socket.on('lock_field', (field) => {
    locks[field] = socket.id;
    socket.broadcast.emit('field_locked', field);
  });

  socket.on('unlock_field', (field) => {
    if (locks[field] === socket.id) {
      delete locks[field];
      socket.broadcast.emit('field_unlocked', field);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    for (const [field, locker] of Object.entries(locks)) {
      if (locker === socket.id) {
        delete locks[field];
        socket.broadcast.emit('field_unlocked', field);
      }
    }
  });
});

server.listen(5000, () => {
  console.log('Server listening on port 5000');
});
