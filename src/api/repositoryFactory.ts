import authRepository from './Authentication/authRepository';
import foodsRepository from './Foods/foodsRepository';
import orderRepository from './Order/orderRepository';
import adminRepository from './User/adminRepository';
import sellerRepository from './User/sellerRepository';
import shipperRepository from './User/shipperRepository';
import userRepository from './User/userRepository';

const repositories = {
  Authentication: authRepository,
  User: userRepository,
  Foods: foodsRepository,
  Order: orderRepository,
  Seller: sellerRepository,
  Shipper: shipperRepository,
  Admin: adminRepository
};

export const authAPI = repositories['Authentication'];
export const userAPI = repositories['User'];
export const foodAPI = repositories['Foods'];
export const orderAPI = repositories['Order'];
export const sellerAPI = repositories['Seller'];
export const shipperAPI = repositories['Shipper'];
export const adminAPI = repositories['Admin'];
