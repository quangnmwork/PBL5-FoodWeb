export interface RoutesConfig {
  path: string;
  component: JSX.Element;
  redirectWhenAlreadyHasUser: boolean;
  needProtected: boolean;
  guard?: (...args: unknown[]) => boolean | Promise<boolean>;
}
