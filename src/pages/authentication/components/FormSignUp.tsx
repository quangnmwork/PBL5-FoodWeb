import { FormControl, HStack, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import ButtonCustom from '../../../components/Button/ButtonCustom';
import FormInput from '../../../components/Form/FormInput';
import FormSelect from '../../../components/Form/FormSelect';
import FormFooterSwitch from './FormFooterSwitch';
import FormHeading from './FormHeading';

const FormSignUp = () => {
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
          <FormInput textLabel={'Email'} placeholder={'abc@example.com'} />
          <FormInput textLabel={'Tài khoản'} placeholder={'abc123'} />
        </HStack>
        <HStack gap={'.5rem'}>
          <FormInput textLabel={'Địa chỉ'} placeholder={'123 XYZ Street'} />
          <FormInput textLabel={'Số điện thoại'} placeholder={'09xxxxx'} />
        </HStack>
        <FormInput textLabel={'Mật khẩu'} typeInput={'password'} />
        <FormInput textLabel={'Xác nhận mật khẩu'} typeInput={'password'} />
        <FormSelect />
        <ButtonCustom
          textDisplay="Sign up"
          onClick={() => {
            console.log();
          }}
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
