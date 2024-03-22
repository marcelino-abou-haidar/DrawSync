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
};

server.listen(PORT, () => {
  console.log(`Backend server started..`);
  console.log(`Listening on port ${PORT}`);
});

const broadcastUserDisconnection = (userId) => {
  const username = connectedUsers[userId].username;
  Object.keys(connections).forEach((uuid) => {
    const connection = connections[uuid];
    const message = JSON.stringify({
      type: EVENT_TYPES.ALERT_EVENT,
      message: `User ${username} has disconnected.`,
    });
    connection.send(message);
  });
};

const onClose = (userId) => {
  console.log(`User ${connectedUsers[userId].username} has disconnected.`);
  broadcastUserDisconnection(userId);
  delete connections[userId];
  delete connectedUsers[userId];
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
});
