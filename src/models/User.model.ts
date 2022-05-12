export interface Seller {
  idUser: string;
  nameUser: string;
  phone: string;
  address: string;
  avatar: string;
  money?: number;
  nameGroup?: string;
}
export interface User {
  idUser: string;
  nameUser: string;
  phone: string;
  address: string;
  avatar: string;
  money?: number;
  nameGroup?: string;
}
export interface UserPermission {
  idAccount: number;
  enableGroupDetail: true;
  timeEnable: any;
  descriptionBan: string | undefined;
}
