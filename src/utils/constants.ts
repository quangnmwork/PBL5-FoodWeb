import { PermissionGroup } from '../models/Permission.model';

export const categories = [
  {
    idCategory: 1,
    nameCategory: 'Đồ ăn'
  },
  {
    idCategory: 2,
    nameCategory: 'Đồ uống'
  },
  {
    idCategory: 3,
    nameCategory: 'Đồ chay'
  },
  {
    idCategory: 4,
    nameCategory: 'Bánh kem'
  },
  {
    idCategory: 5,
    nameCategory: 'Tráng miệng'
  }
];
export const returnIdCategory = (nameCategory: string) => {
  categories.forEach((category) => {
    if (category.nameCategory == nameCategory) return category.idCategory;
  });
  return 1;
};
export const GroupPermission: Pick<
  PermissionGroup,
  'codePermissionDetail' | 'nameGroup' | 'namePermission'
>[] = [
  {
    namePermission: 'Edit Food',
    codePermissionDetail: 'Edit_Food',
    nameGroup: 'Seller'
  },
  {
    namePermission: 'Delete Food',
    codePermissionDetail: 'Delete_Food',
    nameGroup: 'Seller'
  },
  {
    namePermission: 'Create Food',
    codePermissionDetail: 'Create_Food',
    nameGroup: 'Seller'
  },
  {
    namePermission: 'Hidden Food',
    codePermissionDetail: 'Hidden_Food',
    nameGroup: 'Seller'
  },
  {
    namePermission: 'Create Order',
    codePermissionDetail: 'Create_Order',
    nameGroup: 'Customer'
  },
  {
    namePermission: 'Choice Ship',
    codePermissionDetail: 'Choice_Ship',
    nameGroup: 'Shipper'
  }
];
