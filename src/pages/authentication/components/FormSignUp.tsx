import {
  FormControl,
  HStack,
  Flex,
  FormErrorMessage,
  Text
} from '@chakra-ui/react';
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
  } = useForm<signupInput>({
    resolver: yupResolver(signupSchema)
  });

  const [signupErr, setSignupErr] = useState<string>('');
  const signupHandler: SubmitHandler<signupInput> = async (
    data: signupInput
  ): Promise<void> => {
    try {
      await authAPI.signin(data);
    } catch (err: any) {
      setSignupErr(err.response.data);
    }
  };
  useEffect(() => {
    setSignupErr('');
  }, [watch().email, watch().password]);
  console.log(errors);
  return (
    <Flex
      direction={'column'}
      bgColor={'white'}
      padding={'2rem'}
      borderRadius={'.5rem'}
      maxWidth={{ base: '80%', md: '48%', lg: '42%' }}
    >
      <FormControl
        as={motion.div}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ delay: '1' }}
      >
        <FormHeading />
        <HStack gap={'.5rem'}>
          <FormInput
            textLabel={'Email'}
            placeholder={'abc@example.com'}
            register={register}
            nameRegister={'email'}
            errorMessage={errors.email?.message}
          />
          <FormInput
            textLabel={'Tài khoản'}
            placeholder={'abc123'}
            register={register}
            nameRegister={'nameUser'}
            // errorMessage={errors.?.message}
          />
        </HStack>
        <HStack gap={'.5rem'}>
          <FormInput
            textLabel={'Địa chỉ'}
            placeholder={'123 XYZ Street'}
            register={register}
            nameRegister={'address'}
            // errorMessage={errors?.address?.message}
          />
          <FormInput
            textLabel={'Số điện thoại'}
            placeholder={'09xxxxx'}
            register={register}
            nameRegister={'phone'}
            errorMessage={errors?.phone?.message}
          />
        </HStack>
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
          errorMessage={errors.password?.message}
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
