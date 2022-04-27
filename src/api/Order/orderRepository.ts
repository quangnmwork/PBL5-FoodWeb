import axiosClient from '../repository';

export default {
  createOrderDetail(listOrder: { idFood: string; numberFood: number }[]) {
    return axiosClient.post(`OrderDetail/createOrder`, listOrder);
  }
};
