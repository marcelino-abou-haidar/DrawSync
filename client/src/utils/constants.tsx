export const SOCKET_URL = `${import.meta.env.VITE_BACKEND_SERVER_DOMAIN}:${import.meta.env.VITE_BACKEND_SERVER_PORT}`;

export const WEBSOCKET_EVENTS = {
  ALERT_EVENT: 'alert-event',
  CANVAS_UPDATE: 'canvas-event',
  USER_EVENT: 'user-event',
};

export const COLORS = [
  'Black',
  'Red',
  'Green',
  'Blue',
  'Orange',
  'Dodgerblue',
  'Gray',
  'Lightgray',
  'Slateblue',
];

export const BRUSH_SIZES = [2, 4, 6, 8, 10, 12, 14, 16];
