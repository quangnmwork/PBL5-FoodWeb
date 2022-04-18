import { Flex, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  changePasswordInput,
  signinInput,
  signupInput
} from '../../models/Authentication.model';

import ButtonCustom from '../Button/ButtonCustom';
import FormInput from '../Form/FormInput';
import * as yup from 'yup';
import { authAPI } from '../../api/repositoryFactory';
import clientStorage from '../../utils/clientStorage';

const profileSecuritySchema = yup.object({
  password: yup.string().required('Mật khẩu không được trống'),
  passwordConfirm: yup
    .string()
    .required('Xác nhận mật khẩu không được trống')
    .test('equal', 'Mật khẩu xác nhận không đúng', function (value) {
      return value === this.resolve(yup.ref('password'));
    })
});

const ProfileSecurity = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<signupInput | signinInput>({
    resolver: yupResolver(profileSecuritySchema)
  });
  const toast = useToast();
  const [oldPassword, setOldPassword] = useState<string>('');
  const handlePasswordChange = async (data: signupInput | signinInput) => {
    try {
      const submitData = data as signupInput;
      const changePasswordData: changePasswordInput = {
        oldPassword: oldPassword || '',
        newPassword: submitData.password
      };
      const res = await authAPI.changePassword(changePasswordData);
      clientStorage.getClientStorage().setToken(res.data.token);
      if (res.status == 200) {
        toast({
          status: 'success',
          title: 'Đổi mật khẩu thành công',
          position: 'bottom-right',
          duration: 1500,
          variant: 'subtle'
        });
      }
    } catch (err: any) {
      toast({
        status: 'error',
        title: 'Mật khẩu cũ không đúng vui lòng thử lại',
        position: 'bottom-right',
        duration: 1500,
        variant: 'subtle'
      });
    }
  };
  return (
    <Flex
      direction={'column'}
      maxWidth={{ base: '95%', md: '80%', lg: '50%' }}
      mx={'auto'}
    >
      <FormInput
        textLabel={'Mật khẩu cũ'}
        typeInput={'password'}
        value={oldPassword}
        onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
          setOldPassword(event.currentTarget.value);
        }}
      />
      <FormInput
        textLabel={'Mật khẩu mới'}
        typeInput={'password'}
        register={register}
        nameRegister={'password'}
        errorMessage={
          'passwordConfirm' in errors ? errors.password?.message : ''
        }
      />
      <FormInput
        textLabel={'Xác nhận mật khẩu mới'}
        typeInput={'password'}
        register={register}
        nameRegister={'passwordConfirm'}
        errorMessage={
          'passwordConfirm' in errors ? errors.passwordConfirm?.message : ''
        }
      />

      <ButtonCustom
        textDisplay={'Thay đổi mật khẩu'}
        onClick={handleSubmit(handlePasswordChange)}
        width={'100%'}
        mt={'.5rem'}
        isLoading={isSubmitting}
      />
    </Flex>
  );
};

export default ProfileSecurity;
