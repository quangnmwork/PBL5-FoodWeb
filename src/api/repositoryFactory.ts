import authRepository from './Authentication/authRepository';

const repositories = {
  Authentication: authRepository
};

export const authAPI = repositories['Authentication'];
