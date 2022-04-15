import { Role } from './Permission.model';

export interface RoutesConfig {
  path: string;
  component: JSX.Element;
  redirectWhenAlreadyHasUser: boolean;
  needProtected: boolean;
  specificRole?: Role[];
  guard?: (...args: unknown[]) => boolean | Promise<boolean>;
}
