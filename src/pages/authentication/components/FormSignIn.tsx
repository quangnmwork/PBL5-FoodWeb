/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FormControl,
  Flex,
  FormErrorMessage,
  Text,
  useToast
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import ButtonCustom from '../../../components/Button/ButtonCustom';
import FormInput from '../../../components/Form/FormInput';
import FormFooterSwitch from './FormFooterSwitch';
import FormHeading from './FormHeading';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signinInput } from './../../../models/Authentication.model';
import { signinSchema } from './../validation/index';
import { yupResolver } from '@hookform/resolvers/yup';
import { authAPI } from '../../../api/repositoryFactory';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clientStorage from '../../../utils/clientStorage';

const FormSignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<signinInput>({
    resolver: yupResolver(signinSchema)
  });
  const toast = useToast();

  const [_, setSigninErr] = useState<string>('');
  const navigate = useNavigate();
  const loginHandler: SubmitHandler<signinInput> = async (
    data: signinInput
  ): Promise<void> => {
    try {
      console.log(data);
      const res = await authAPI.signin(data);
      console.log(res);
      clientStorage.getClientStorage().setToken(res.data.token);
      navigate('/', { replace: true });
    } catch (err: any) {
      toast({
        status: 'error',
        position: 'top',
        title: 'Tài khoản hoặc mật khẩu không đúng',
        duration: 1500
      });
    }
  };

  useEffect(() => {
    setSigninErr('');
  }, [watch().email, watch().password]);
  return (
    <Flex
      direction={'column'}
      bgColor={'white'}
      padding={'2rem'}
      borderRadius={'.5rem'}
      justifyContent={'center'}
      width={{ base: '80%', md: '45%', lg: '30%' }}
    >
      <FormControl
        as={motion.div}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ delay: '1' }}
      >
        <FormHeading />
        <FormInput
          textLabel={'Email'}
          errorMessage={errors.email?.message}
          typeInput={'text'}
          register={register}
          nameRegister={'email'}
        />
        <FormInput
          textLabel={'Mật khẩu'}
          typeInput={'password'}
          errorMessage={errors.password?.message}
          register={register}
          nameRegister={'password'}
        />

        <ButtonCustom
          textDisplay={'Sign In'}
          onClick={handleSubmit(loginHandler)}
          width={'100%'}
          isLoading={isSubmitting}
        />
        <FormFooterSwitch
          message={'Chưa có tài khoản?'}
          messageActionType={'sign-in'}
        />
      </FormControl>
    </Flex>
  );
};

export default FormSignIn;
