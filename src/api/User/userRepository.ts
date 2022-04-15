import axiosClient from '../repository';
const path = 'Users';

export default {
  getUserProfile() {
    return axiosClient.get(`${path}/GetProfileUser`);
  }
};
