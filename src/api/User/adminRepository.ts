import axiosClient from '../repository';
const path = 'Admin';
export default {
  getTotalPageOfRole(role: string) {
    return axiosClient.get(`${path}/${role}/getTotalPage`);
  },
  getUserOfRole(role: string, pageNumber: number) {
    return axiosClient.get(`${path}/${role}/page-${pageNumber}`);
  },
  getTotalPageOfRoleBySearch(role: string, keyName: string) {
    return axiosClient.get(`${path}/${role}/search/getTotalPage`, {
      params: {
        keyName: keyName
      }
    });
  },
  getUserOfRoleBySearch(role: string, keyName: string, pageNumber: number) {
    return axiosClient.get(`${path}/${role}/search/page-${pageNumber}`, {
      params: {
        keyName: keyName
      }
    });
  },
  checkBanUser(id: number) {
    return axiosClient.get(`${path}/checkBanGroup/${id}`);
  },
  banUser(idUser: number, date: string, descriptionBan: string) {
    return axiosClient.post(`${path}/banUser`, {
      idUser: idUser,
      timeEnable: date,
      descriptionBan: descriptionBan
    });
  },
  unbanUser(id: number) {
    return axiosClient.post(`${path}/unBanUser/${id}`);
  },
  editBanUser(idUser: number, date: string, descriptionBan: string) {
    return axiosClient.patch(`${path}/editBanUser`, {
      idUser: idUser,
      timeEnable: date,
      descriptionBan: descriptionBan
    });
  },
  getSellerShip(id: number) {
    return axiosClient.get(`${path}/getChoiceShip/${id}`);
  },
  setGroupPermission(code: string, enable: boolean) {
    return axiosClient.post(`${path}/setBanPermission`, {
      codePermissionDetail: code,
      enableGroupDetail: enable
    });
  }
};
