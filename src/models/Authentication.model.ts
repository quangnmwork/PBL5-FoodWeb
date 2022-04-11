export interface signinInput {
  email: string;
  password: string;
}
export interface signupInput {
  nameUser: string;
  phone: string;
  address: string;
  email: string;
  password: string;
  nameGroup: 'customer' | 'seller' | 'shipper';
}
