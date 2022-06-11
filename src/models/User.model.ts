import { Role } from './Permission.model';

export interface User {
  idUser: string;
  nameUser: string;
  phone: string;
  address: string;
  avatar: string;
  money?: number;
  nameGroup: Role;
}

export interface UserPermission {
  idAccount: number;
  enableGroupDetail: true;
  timeEnable: any;
  descriptionBan: string | undefined;
}
