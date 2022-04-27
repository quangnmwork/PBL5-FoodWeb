import axiosClient from '../repository';
const path = 'OrderDetail';
export default {
  createOrderDetail(listOrder: { idFood: string; numberFood: number }[]) {
    return axiosClient.post(`${path}/createOrder`, listOrder);
  },
  getAllOrderNotShipped(numberPage: number) {
    return axiosClient.get(
      `${path}/getAllOrderNotShippedYet/page-${numberPage}`
    );
  },
  getAllOrderShipped(numberPage: number) {
    return axiosClient.get(`${path}/getAllOrderShipped/page-${numberPage}`);
  },
  getTotalPageOrderNotShipped() {
    return axiosClient.get(`${path}/getTotalPageListOrderNotShippedYet`);
  },
  getTotalPageOrderShipped() {
    return axiosClient.get(`${path}/getTotalPageListOrderShipped`);
  },
  getAllFoodByOrderId(orderDetailId: number) {
    return axiosClient.get(`${path}/getListFoodOrder/${orderDetailId}`);
  }
};
