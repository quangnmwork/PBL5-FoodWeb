import axiosClient from '../repository';
const path = 'Admin';
export default {
  getTotalPageOfRole(role: string) {
    return axiosClient.get(`${path}/${role}/getTotalPage`);
  },
  getUserOfRole(role: string, pageNumber: number) {
    return axiosClient.get(`${path}/${role}/page-${pageNumber}`);
  },
  getTotalPageOfRoleBySearch(
    role: string,
    nameUser: string,
    phone: string,
    address: string
  ) {
    return axiosClient.get(`${path}/${role}/search/getTotalPage`, {
      params: {
        nameUser: nameUser,
        phone: phone,
        address: address
      }
    });
  },
  getUserOfRoleBySearch(
    role: string,
    nameUser: string,
    phone: string,
    address: string,
    pageNumber: number
  ) {
    return axiosClient.get(`${path}/${role}/search/page-${pageNumber}`, {
      params: {
        nameUser: nameUser,
        phone: phone,
        address: address
      }
    });
  }
};
