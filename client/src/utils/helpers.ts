import { RoutePaths } from 'src/routes/constants';

export const getRoute = (route: RoutePaths, id: string | number) => {
  return route.replace(`:id`, id.toString());
};
