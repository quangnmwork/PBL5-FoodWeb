export type Role = 'Customer' | 'Admin' | 'Shipper' | 'Seller';
export interface PermissionGroup {
  enableGroupDetail: any;
  namePermission: string;
  nameGroup: string;
  descriptionPermissionDetail: string;
  enablePermissionDetail: boolean;
  codePermissionDetail: string;
}
