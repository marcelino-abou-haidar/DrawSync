const { WebSocketServer, WebSocket } = require('ws');
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const { EVENT_TYPES } = require('./utils/constants');

const PORT = 3000;
const server = http.createServer();
const ws = new WebSocketServer({ server });
const connections = {};
const users = {};
const rooms = {};

server.listen(PORT, () => {
  console.log(`Backend server started..`);
  console.log(`Listening on port ${PORT}`);
});

const broadCastConnectedUsers = (roomId) => {
  const room = rooms[roomId];

  if (!room) {
    console.log(`Room with ID ${roomId} not found.`);
    return;
  }

  const usersInRoom = room.map((client) => ({
    userId: client.userId,
    username: users[client.userId].username,
    isPainting: users[client.userId].state.isPainting,
  }));

  const message = JSON.stringify({
    type: EVENT_TYPES.USERS_LIST,
    data: usersInRoom,
  });

  room.forEach((client) => {
    client.client.send(message);
  });
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
  const { roomId } = users[userId];

  if (!roomId || !rooms[roomId]) {
    console.log(`User ${userId} is not in a valid room.`);
    return;
  }

  const jsonMessage = JSON.stringify(message);

  rooms[roomId].forEach((client) => {
    if (client.userId === userId) {
      return;
    }

    client.client.send(jsonMessage);
  });
};

const broadCastCanvasClear = (userId, message) => {
  const { roomId } = users[userId];
  if (!roomId || !rooms[roomId]) {
    console.log(`User ${userId} is not in a valid room.`);
    return;
  }

  const jsonMessage = JSON.stringify(message);

  rooms[roomId].forEach((client) => {
    if (client.userId === userId) {
      return;
    }

    client.client.send(jsonMessage);
  });
};

const broadCastUserPaintingStatus = (userId, message) => {
  if (!users[userId]) {
    return;
  }

  const { roomId } = users[userId];

  if (!roomId || !rooms[roomId]) {
    console.log(`User ${userId} is not in a valid room.`);
    return;
  }

  const isPainting = message.data.isPainting;

  users[userId].state.isPainting = isPainting;

  broadCastConnectedUsers(roomId);
};

const onClose = (userId) => {
  const user = users[userId];

  if (!user) {
    console.log(`User not found..`);
    return;
  }

  const { roomId } = user;

  if (!roomId || !rooms[roomId]) {
    delete users[userId];
    return;
  }

  const room = rooms[roomId];
  const index = room.findIndex((client) => client.userId === userId);
  if (index !== -1) {
    room.splice(index, 1);
    delete users[userId];
    if (room.length === 0) {
      delete rooms[roomId];
    }
  }
};

const handleCreateRoom = (userId, { message }) => {
  const roomId = uuidv4();
  const client = connections[userId];
  const username = message.username;

  users[userId] = {
    username,
    roomId,
    state: {
      isPainting: false,
    },
  };

  rooms[roomId] = [
    {
      userId,
      client,
    },
  ];

  const messageToSend = JSON.stringify({
    type: EVENT_TYPES.ROOM_CREATED,
    message: {
      roomId,
    },
  });

  client.send(messageToSend);

  setTimeout(() => {
    broadCastConnectedUsers(roomId);
  }, 500);
};

const handleRoomJoin = (userId, { message }) => {
  const username = message.username;
  const roomId = message.roomId;
  const client = connections[userId];

  users[userId] = {
    username,
    roomId,
    state: {
      isPainting: false,
    },
  };

  if (rooms[roomId] === undefined) {
    const message = JSON.stringify({
      type: EVENT_TYPES.ALERT_EVENT,
      message: {
        data: `This room does not exist.`,
      },
    });

    client.send(message);

    console.log(
      `User ${username} tried to connect to a room that does not exist.`
    );

    return;
  }

  rooms[roomId].push({
    userId,
    client,
  });

  const messageToSend = JSON.stringify({
    type: EVENT_TYPES.ROOM_JOINED,
    message: {
      roomId,
    },
  });

  client.send(messageToSend);

  broadCastConnectedUsers(roomId);

  console.log(`User ${username} joined room with the ID of ${roomId}`);
};

const onMessage = (userId, message) => {
  const jsonMessage = JSON.parse(message.toString());

  switch (jsonMessage.type) {
    case EVENT_TYPES.ROOM_CREATE:
      handleCreateRoom(userId, jsonMessage);
      break;
    case EVENT_TYPES.ROOM_JOIN:
      handleRoomJoin(userId, jsonMessage);
      break;
    case EVENT_TYPES.CANVAS_DRAW:
      broadCastCanvasDrawing(userId, jsonMessage);
      break;
    case EVENT_TYPES.CANVAS_CLEAR:
      broadCastCanvasClear(userId, jsonMessage);
      break;
    case EVENT_TYPES.USER_PAINTING:
      broadCastUserPaintingStatus(userId, jsonMessage);
      break;
    default:
      console.log(`Unknown event type received.`);
  }
};

ws.on('connection', (connection) => {
  const userId = uuidv4();
  connections[userId] = connection;
  console.log(`A new user has connected.`);
  connection.on('close', () => onClose(userId));
  connection.on('message', (message) => onMessage(userId, message));
});
