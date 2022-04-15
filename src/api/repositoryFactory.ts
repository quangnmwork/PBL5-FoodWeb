import authRepository from './Authentication/authRepository';
import userRepository from './User/userRepository';

const repositories = {
  Authentication: authRepository,
  User: userRepository
};

export const authAPI = repositories['Authentication'];
export const userAPI = repositories['User'];
