import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import App from 'src/App';
import { Board, CreateRoom, JoinRoom } from 'src/components';
import { ROUTES } from 'src/routes/constants';

export const routerConfig: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <App />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Navigate to={ROUTES.ROOM_CREATE} />,
      },
      {
        path: ROUTES.ROOM_JOIN,
        element: <JoinRoom />,
      },
      {
        path: ROUTES.ROOM_CREATE,
        element: <CreateRoom />,
      },
      {
        path: ROUTES.DRAWING_BOARD,
        element: <Board />,
      },
    ],
  },
];

export const router = createBrowserRouter(routerConfig);
