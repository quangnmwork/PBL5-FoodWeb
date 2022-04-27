import authRepository from './Authentication/authRepository';
import foodsRepository from './Foods/foodsRepository';
import orderRepository from './Order/orderRepository';
import userRepository from './User/userRepository';

const repositories = {
  Authentication: authRepository,
  User: userRepository,
  Foods: foodsRepository,
  Order: orderRepository
};

export const authAPI = repositories['Authentication'];
export const userAPI = repositories['User'];
export const foodAPI = repositories['Foods'];
export const orderAPI = repositories['Order'];
