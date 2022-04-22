import { DynamicObject } from '../../models/DynamicObject.model';
import axiosClient from '../repository';
const path = 'Users';

export default {
  getUserProfile() {
    return axiosClient.get(`${path}/GetProfileUser`);
  },
  updateUserProfile(data: DynamicObject) {
    return axiosClient.patch(`${path}/EditProfile`, data);
  },
  getSellers(pageNumber: number) {
    return axiosClient.get(`${path}/getAllSellers/page-${pageNumber}`);
  }
};
