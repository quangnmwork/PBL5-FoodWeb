import axiosClient from '../repository';
const path = 'Admin';
export default {
  getTotalPageOfRole(role: string) {
    return axiosClient.get(`${path}/${role}/getTotalPage`);
  },
  getUserOfRole(role: string, pageNumber: number) {
    return axiosClient.get(`${path}/${role}/page-${pageNumber}`);
  }
};
