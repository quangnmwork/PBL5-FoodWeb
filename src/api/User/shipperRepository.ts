import axiosClient from '../repository';
const path = 'OrderDetail';

export default {
  getAllShip(pageNumber: number) {
    return axiosClient.get(
      `${path}/getListOrderDetailChoiceShip/page-${pageNumber}`
    );
  },
  getTotalPageAllShip() {
    return axiosClient.get(`${path}/getTotalPageChoiceShip`);
  },
  getMyShip() {
    return axiosClient.get(`${path}/getListOrderShipperChoice`);
  },
  getDetailMyShip(id: number) {
    return axiosClient.get(`${path}/getListFoodOrder/${id}`);
  },
  tickShip(id: number) {
    return axiosClient.post(`${path}/tickShip/${id}`);
  }
};
