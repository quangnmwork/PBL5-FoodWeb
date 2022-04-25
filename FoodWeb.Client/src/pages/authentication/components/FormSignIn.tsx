import { FormControl, Flex, FormErrorMessage, Text } from '@chakra-ui/react';
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
  const [signinErr, setSigninErr] = useState<string>('');
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
      console.log(err.response.data);
      setSigninErr(err.response.data);
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
        isInvalid={signinErr.length > 0}
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
        <FormErrorMessage mb={'1rem'}>
          <Text textAlign={'center'} width={'100%'}>
            {signinErr}
          </Text>
        </FormErrorMessage>
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
