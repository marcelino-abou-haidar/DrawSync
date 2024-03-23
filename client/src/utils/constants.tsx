export const SOCKET_URL = `${import.meta.env.VITE_BACKEND_SERVER_DOMAIN}:${import.meta.env.VITE_BACKEND_SERVER_PORT}`;

export const WEBSOCKET_EVENTS = {
  ALERT_EVENT: 'alert-event',
  CANVAS_DRAW: 'canvas-draw',
  CANVAS_CLEAR: 'canvas-clear',
  USER_EVENT: 'user-event',
  USER_CONNECTED: 'user-connected',
  USER_DISCONNECTED: 'user-disconnected',
  USERS_LIST: 'users-list',
};

export const COLORS = [
  'black',
  'crimson',
  'forestgreen',
  'royalblue',
  'orange',
  'teal',
  'gray',
  'purple',
  'lightgoldenrodyellow',
  'hotpink',
  'goldenrod',
  'limegreen',
  'darkslategray',
  'mediumblue',
  'magenta',
  'mistyrose',
  'peru',
  'darkolivegreen',
  'coral',
];

export const BRUSH_SIZES = [2, 4, 6, 8, 10, 12, 14, 16];
