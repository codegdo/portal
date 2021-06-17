export interface RouteData {
  path?: string;
  exact?: boolean;
  component?: string;
  group?: string;
  redirectTo?: string;
  restricted?: boolean;
  data?: { [key: string]: string };
}

export interface RoutesProps {
  routes: RouteData[];
}
