import axiosClient from '../repository';
import {
  changePasswordInput,
  signinInput,
  signupInput
} from './../../models/Authentication.model';
const path = 'Accounts';

export default {
  signin(signinData: signinInput) {
    return axiosClient.post(`${path}/login`, signinData);
  },
  signup(signupData: signupInput) {
    return axiosClient.post(`${path}/register`, signupData);
  },
  changePassword(passwordData: changePasswordInput) {
    return axiosClient.patch(`${path}/changePassword`, passwordData);
  }
};
