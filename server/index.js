const { WebSocketServer } = require('ws');
const http = require('http');
const url = require('url');
const { v4: uuidv4 } = require('uuid');

const PORT = 3000;
const server = http.createServer();
const ws = new WebSocketServer({ server });

const connections = {};
const connectedUsers = {};

const EVENT_TYPES = {
  ALERT_EVENT: 'alert-event',
  CANVAS_UPDATE: 'canvas-event',
  USER_EVENT: 'user-event',
};

server.listen(PORT, () => {
  console.log(`Backend server started..`);
  console.log(`Listening on port ${PORT}`);
});

const broadcastMessage = (userId, message, all = false) => {
  Object.keys(connections).map((uuid) => {
    const connection = connections[uuid];

    if (!all && uuid !== userId) {
      connection.send(message);
    } else if (all) {
      connection.send(message);
    }
  });
};

const broadcastUserDisconnection = (userId) => {
  const username = connectedUsers[userId].username;
  const message = JSON.stringify({
    type: EVENT_TYPES.ALERT_EVENT,
    message: {
      alert: `User ${username} has disconnected.`,
    },
  });

  broadcastMessage(userId, message);
};

const broadCastCanvasUpdates = (userId, message) => {
  const jsonMessage = JSON.stringify(message);
  broadcastMessage(userId, jsonMessage);
};

const onClose = (userId) => {
  console.log(`User ${connectedUsers[userId].username} has disconnected.`);
  broadcastUserDisconnection(userId);
  delete connections[userId];
  delete connectedUsers[userId];
};

const onMessage = (userId, message) => {
  const convertedMessage = JSON.parse(message.toString());

  switch (convertedMessage.type) {
    case EVENT_TYPES.CANVAS_UPDATE:
      broadCastCanvasUpdates(userId, convertedMessage);
      break;
    default:
      console.log(`Unknown event type received.`);
  }
};

ws.on('connection', (connection, request) => {
  const userId = uuidv4();
  const { username } = url.parse(request.url, true).query;
  connections[userId] = connection;
  connectedUsers[userId] = { username };

  console.log(
    `A new WebSocket connection has been established for user ${username}`
  );

  connection.on('close', () => onClose(userId));
  connection.on('message', (message) => onMessage(userId, message));
});
