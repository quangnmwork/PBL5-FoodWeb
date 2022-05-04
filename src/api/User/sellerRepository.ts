import axiosClient from '../repository';
const path = 'Foods';
export default {
  getTotalPageListFoods() {
    return axiosClient.get(`${path}/getTotalPageListFoodOfSeller`);
  },
  getListFoods(numberPage: number) {
    return axiosClient.get(`${path}/getListFood/page-${numberPage}`);
  },
  getFood(idFood: number) {
    return axiosClient.get(`${path}/forSeller/${idFood}`);
  },
  createFood(foodData: FormData) {
    return axiosClient.post(`${path}/createFood`, foodData);
  },
  deleteFood(idFood: number) {
    return axiosClient.delete(`${path}/DeleteFood/${idFood}`);
  },
  editFood(idFood: number, foodData: FormData) {
    return axiosClient.patch(`${path}/editFood/${idFood}`, foodData);
  }
};
