export interface signinInput {
  email: string;
  password: string;
}
export interface signupInput extends signinInput {
  passwordConfirm: string;
  nameUser: string;
  phone: string;
  address: string;
  nameGroup: 'Customer' | 'Seller' | 'Shipper';
}

export type signinAuthType = 'email' | 'password';
export type signupAuthType =
  | 'email'
  | 'password'
  | 'passwordConfirm'
  | 'nameUser'
  | 'phone'
  | 'address'
  | 'nameGroup';
