import { Role } from '../models/Permission.model';
import lodash from 'lodash';

export const permissionGuard = (rolePermisson: Role[], userRole: Role) => {
  return lodash.includes(rolePermisson, userRole);
};
