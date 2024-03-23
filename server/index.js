const { WebSocketServer } = require('ws');
const http = require('http');
const url = require('url');
const { v4: uuidv4 } = require('uuid');

const PORT = 3000;
const server = http.createServer();
const ws = new WebSocketServer({ server });

const connections = {};
const users = {};

const EVENT_TYPES = {
  ALERT_EVENT: 'alert-event',
  CANVAS_DRAW: 'canvas-draw',
  CANVAS_CLEAR: 'canvas-clear',
  USER_EVENT: 'user-event',
  USER_CONNECTED: 'user-connected',
  USER_DISCONNECTED: 'user-disconnected',
  USERS_LIST: 'users-list',
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

const broadCastConnectedUsers = (userId) => {
  const message = JSON.stringify({
    type: EVENT_TYPES.USERS_LIST,
    data: users,
  });

  broadcastMessage(userId, message, true);
};

const broadcastUserDisconnection = (userId) => {
  const username = users[userId].username;
  const message = JSON.stringify({
    type: EVENT_TYPES.ALERT_EVENT,
    message: {
      alert: `User ${username} has disconnected.`,
    },
  });

  broadcastMessage(userId, message);
};

const broadCastCanvasDrawing = (userId, message) => {
  const jsonMessage = JSON.stringify(message);
  broadcastMessage(userId, jsonMessage);
};

const broadCastCanvasClear = (userId) => {
  const message = JSON.stringify({
    type: EVENT_TYPES.CANVAS_CLEAR,
  });

  broadcastMessage(userId, message);
};

const onClose = (userId) => {
  console.log(`User ${users[userId].username} has disconnected.`);
  broadcastUserDisconnection(userId);
  delete connections[userId];
  delete users[userId];
  broadCastConnectedUsers(userId);
};

const onOpen = (userId) => {
  console.log(userId);
};

const onMessage = (userId, message) => {
  const convertedMessage = JSON.parse(message.toString());

  switch (convertedMessage.type) {
    case EVENT_TYPES.CANVAS_DRAW:
      broadCastCanvasDrawing(userId, convertedMessage);
      break;
    case EVENT_TYPES.CANVAS_CLEAR:
      broadCastCanvasClear(userId);
    default:
      console.log(`Unknown event type received.`);
  }
};

ws.on('connection', (connection, request) => {
  const userId = uuidv4();
  const { username } = url.parse(request.url, true).query;
  connections[userId] = connection;
  users[userId] = { username, isDrawing: false };

  console.log(
    `A new WebSocket connection has been established for user ${username}`
  );

  broadCastConnectedUsers(userId);

  connection.on('close', () => onClose(userId));
  connection.on('open', () => onOpen(uuid));
  connection.on('message', (message) => onMessage(userId, message));
});
