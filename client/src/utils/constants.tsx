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
  { name: 'black', hex: '#000000', darkerHex: '#555555' },
  { name: 'crimson', hex: '#DC143C', darkerHex: '#800000' },
  { name: 'forestgreen', hex: '#228B22', darkerHex: '#006400' },
  { name: 'royalblue', hex: '#4169E1', darkerHex: '#000080' },
  { name: 'orange', hex: '#FFA500', darkerHex: '#8B4500' },
  { name: 'teal', hex: '#008080', darkerHex: '#004D4D' },
  { name: 'gray', hex: '#808080', darkerHex: '#555555' },
  { name: 'purple', hex: '#800080', darkerHex: '#4B0082' },
  { name: 'lightgoldenrodyellow', hex: '#FAFAD2', darkerHex: '#D2D490' },
  { name: 'hotpink', hex: '#FF69B4', darkerHex: '#8B2252' },
  { name: 'goldenrod', hex: '#DAA520', darkerHex: '#B8860B' },
  { name: 'limegreen', hex: '#32CD32', darkerHex: '#008000' },
  { name: 'darkslategray', hex: '#2F4F4F', darkerHex: '#1E272E' },
  { name: 'mediumblue', hex: '#0000CD', darkerHex: '#000080' },
  { name: 'magenta', hex: '#FF00FF', darkerHex: '#800080' },
  { name: 'mistyrose', hex: '#FFE4E1', darkerHex: '#C0C0C0' },
  { name: 'peru', hex: '#CD853F', darkerHex: '#8B4513' },
  { name: 'darkolivegreen', hex: '#556B2F', darkerHex: '#364C21' },
  { name: 'coral', hex: '#FF7F50', darkerHex: '#CD5B45' },
];

export const BRUSH_SIZES = [2, 4, 6, 8, 10, 12, 14, 16, 18];
