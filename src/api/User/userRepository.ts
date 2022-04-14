import axiosClient from '../repository';
import { signinInput, signupInput } from './../../models/Authentication.model';
const path = 'Accounts';

export default {
  signin(signinData: signinInput) {
    return axiosClient.post(`${path}/login`, signinData);
  },
  signup(signupData: signupInput) {
    return axiosClient.post(`${path}/register`, signupData);
  }
};
