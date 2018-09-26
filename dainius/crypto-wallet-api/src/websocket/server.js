const socketio = require('socket.io');
const logger = require('../utils/logger');

let ws;

const startServer = (server) => {
  const io = socketio(server);
  io.on('connection', (socket) => {
    ws = socket;
    logger.info('Websocket client connected');
  });
};

module.exports = {
  startServer,
  ws: () => ws,
};
