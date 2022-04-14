import { FormControl, Flex, FormErrorMessage, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import ButtonCustom from '../../../components/Button/ButtonCustom';
import FormInput from '../../../components/Form/FormInput';
import FormSelect from '../../../components/Form/FormSelect';
import FormFooterSwitch from './FormFooterSwitch';
import FormHeading from './FormHeading';
import {
  signinInput,
  signupInput
} from './../../../models/Authentication.model';
import { signupSchema } from './../validation/index';
import { yupResolver } from '@hookform/resolvers/yup';
import { authAPI } from '../../../api/repositoryFactory';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

const FormSignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<signupInput | signinInput>({
    resolver: yupResolver(signupSchema)
  });
  const [signupErr, setSignupErr] = useState<string>('');
  const signupHandler: SubmitHandler<signupInput | signinInput> = async (
    data: signupInput | signinInput
  ): Promise<void> => {
    try {
      const submitData = data as signupInput;
      // console.log(submitData);
      await authAPI.signup(submitData);
    } catch (err: any) {
      setSignupErr(err.response.data);
    }
  };
  useEffect(() => {
    setSignupErr('');
  }, [watch().email, watch().password]);
  return (
    <Flex
      direction={'column'}
      bgColor={'white'}
      padding={'2rem'}
      borderRadius={'.5rem'}
      maxWidth={{ base: '80%', md: '55%', lg: '45%' }}
    >
      <FormControl
        as={motion.div}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ delay: '1' }}
      >
        <FormHeading />
        <Flex gap={'.5rem'} alignItems={'flex-start'}>
          <FormInput
            textLabel={'Email'}
            placeholder={'abc@example.com'}
            register={register}
            nameRegister={'email'}
            errorMessage={'email' in errors ? errors.email?.message : ''}
          />
          <FormInput
            textLabel={'Tài khoản'}
            placeholder={'abc123'}
            register={register}
            nameRegister={'nameUser'}
            errorMessage={'nameUser' in errors ? errors.nameUser?.message : ''}
          />
        </Flex>
        <Flex gap={'.5rem'}>
          <FormInput
            textLabel={'Địa chỉ'}
            placeholder={'123 XYZ Street'}
            register={register}
            nameRegister={'address'}
            errorMessage={'address' in errors ? errors.address?.message : ''}
          />
          <FormInput
            textLabel={'Số điện thoại'}
            placeholder={'09xxxxx'}
            register={register}
            nameRegister={'phone'}
            errorMessage={'phone' in errors ? errors.phone?.message : ''}
          />
        </Flex>
        <FormInput
          textLabel={'Mật khẩu'}
          typeInput={'password'}
          register={register}
          nameRegister={'password'}
          errorMessage={errors.password?.message}
        />
        <FormInput
          textLabel={'Xác nhận mật khẩu'}
          typeInput={'password'}
          register={register}
          nameRegister={'passwordConfirm'}
          errorMessage={
            'passwordConfirm' in errors ? errors.passwordConfirm?.message : ''
          }
        />
        <FormSelect register={register} nameRegister={'nameGroup'} />
        <FormErrorMessage mb={'1rem'}>
          <Text textAlign={'center'} width={'100%'}>
            {signupErr}
          </Text>
        </FormErrorMessage>
        <ButtonCustom
          textDisplay="Sign up"
          onClick={handleSubmit(signupHandler)}
          width={'100%'}
          isLoading={isSubmitting}
        />
        <FormFooterSwitch
          message={'Đã có tài khoản?'}
          messageActionType={'sign-up'}
        />
      </FormControl>
    </Flex>
  );
};

export default FormSignUp;
