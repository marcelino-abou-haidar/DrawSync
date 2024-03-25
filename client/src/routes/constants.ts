type RoutesType = typeof ROUTES;
type RouteKeys = keyof RoutesType;
export type RoutePaths = RoutesType[RouteKeys];

export const ROUTES = {
  HOME: '/',
  ROOM_JOIN: '/join-room',
  ROOM_CREATE: '/create-room',
  DRAWING_BOARD: '/room/:id',
};
