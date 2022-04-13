export interface signinInput {
  email: string;
  password: string;
}
export interface signupInput {
  email: string;
  password: string;
  nameUser: string;
  phone: string;
  address: string;
  nameGroup: 'customer' | 'seller' | 'shipper';
}
