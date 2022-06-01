import axiosClient from '../repository';
const path = 'Users';

export default {
  getUserProfile() {
    return axiosClient.get(`${path}/GetProfileUser`);
  },
  updateUserProfile(data: FormData) {
    return axiosClient.patch(`${path}/EditProfile`, data);
  },
  getSellers(pageNumber: number) {
    return axiosClient.get(`${path}/getAllSellers/page-${pageNumber}`);
  },
  getSellerById(idSeller: number) {
    return axiosClient.get(`${path}/getSellerById/${idSeller}`);
  },
  getTotalPageSellers() {
    return axiosClient.get(`${path}/getTotalPageAllSellers`);
  },
  getTotalFoodPagesOfSeller(idSeller: number) {
    return axiosClient.get(
      `${path}/${idSeller}/foods/getTotalPageFoodByIdSeller`
    );
  },
  getAllFoodsOfSeller(idSeller: number, pageNumber: number) {
    return axiosClient.get(`${path}/${idSeller}/foods/page-${pageNumber}`);
  },
  getAllSellerBySearch(keyName: string, pageNumber: number) {
    return axiosClient.get(`${path}/getAllSellerSearch/page-${pageNumber}`, {
      params: { keyName: keyName }
    });
  },
  getTotalPageBySearch(keyName: string) {
    return axiosClient.get(`${path}/getTotalPageSellerSearch`, {
      params: { keyName: keyName }
    });
  },
  getPaymentDetail(id: number) {
    return axiosClient.get(`Payment/getPayment/${id}`);
  }
};
