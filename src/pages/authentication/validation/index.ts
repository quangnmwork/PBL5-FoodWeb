import * as yup from 'yup';

export const signinSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email không được trống')
    .email('Email không hợp lệ'),
  password: yup.string().required('Mật khẩu không được trống')
});

export const signupSchema = yup.object({
  email: yup
    .string()
    .required('Email không được trống')
    .email('Email không hợp lệ'),
  phone: yup.string().required('Số điện thoại không được trống'),
  address: yup.string().required('Địa chỉ không được trống'),
  nameUser: yup.string().required('Tài khoản không được trống'),
  password: yup.string().required('Mật khẩu không được trống'),
  passwordConfirm: yup.string().required('Xác nhận mật khẩu không được trống'),
  nameGroup: yup.string()
});
