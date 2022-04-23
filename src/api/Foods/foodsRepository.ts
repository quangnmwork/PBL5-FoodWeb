import axiosClient from '../repository';
const path = 'Foods';

export default {
  getAllFoodsByPage(numberPage: number) {
    return axiosClient.get(`${path}/getAllFoods/page-${numberPage}`);
  },
  getAllFoodsByPageAndCategory(
    category: string,
    keyName: string,
    numberPage: number
  ) {
    return axiosClient.get(`${path}/search/page-${numberPage}`, {
      params: { nameCategory: category, keyName: keyName }
    });
  }
};
