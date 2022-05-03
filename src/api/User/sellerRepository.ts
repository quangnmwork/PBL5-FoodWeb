import axiosClient from '../repository';
const path = 'Foods';
export default {
  getTotalPageListFoods() {
    return axiosClient.get(`${path}/getTotalPageListFoodOfSeller`);
  },
  getListFoods(numberPage: number) {
    return axiosClient.get(`${path}/getListFood/page-${numberPage}`);
  }
};
