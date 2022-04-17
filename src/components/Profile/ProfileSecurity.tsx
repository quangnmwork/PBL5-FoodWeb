import { Flex } from '@chakra-ui/react';

import ButtonCustom from '../Button/ButtonCustom';
import FormInput from '../Form/FormInput';

const ProfileSecurity = () => {
  return (
    <Flex
      direction={'column'}
      maxWidth={{ base: '95%', md: '80%', lg: '50%' }}
      mx={'auto'}
    >
      <FormInput textLabel={'Mật khẩu cũ'} />
      <FormInput textLabel={'Mật khẩu mới'} typeInput={'password'} />
      <FormInput textLabel={'Xác nhận mật khẩu mới'} typeInput={'password'} />

      <ButtonCustom
        textDisplay={'Thay đổi mật khẩu'}
        onClick={() => {
          console.log();
        }}
        width={'100%'}
        mt={'.5rem'}
      />
    </Flex>
  );
};

export default ProfileSecurity;
