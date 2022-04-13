export interface signinInput {
  email: string;
  password: string;
}
export interface signupInput extends signinInput {
  passwordConfirm: string;
  nameUser: string;
  phone: string;
  address: string;
  nameGroup: 'customer' | 'seller' | 'shipper';
}
