export interface RouteData {
  path?: string;
  exact?: boolean;
  component?: string;
  redirectTo?: string;
  restricted?: boolean;
  data?: { x: string };
}

export interface RoutesProps {
  routes: RouteData[];
}
