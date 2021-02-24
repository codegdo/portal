export interface RouteComponentData {
  path?: string;
  exact?: boolean;
  component?: string;
  redirectTo?: string;
  restricted?: boolean;
  data?: { x: string };
}

export interface RouteComponentProps {
  routes: RouteComponentData[];
}
