import {
  Avatar,
  AvatarBadge,
  Box,
  FormLabel,
  Icon,
  Input,
  Flex
} from '@chakra-ui/react';
import { AiOutlineCamera } from 'react-icons/ai';
import { DynamicObject } from '../../models/DynamicObject.model';
import ButtonCustom from '../Button/ButtonCustom';
import FormInput from '../Form/FormInput';

interface ProfileProps {
  userData?: DynamicObject;
}

const Profile = (props: ProfileProps) => {
  console.log('Profile', props.userData);
  return (
    <Flex
      direction={'column'}
      maxWidth={{ base: '95%', md: '80%', lg: '50%' }}
      mx={'auto'}
    >
      <Box alignSelf={'center'} mb={'1rem'}>
        <Avatar
          src={props.userData?.avatar || '/assets/user-avatar.jpg'}
          borderColor={'main.100'}
          borderWidth={'1px'}
          size={'xl'}
        >
          <AvatarBadge
            boxSize={'1.1em'}
            backgroundColor={'main.100'}
            borderColor={'main.100'}
          >
            <Box height={'full'}>
              <FormLabel
                htmlFor="avatar"
                fontSize={'2rem'}
                display={'block'}
                width={'100%'}
                height={'100%'}
              >
                <Icon
                  aria-label="Photo"
                  as={AiOutlineCamera}
                  boxSize={'.8em'}
                  color={'white'}
                  display={'block'}
                  mx={'auto'}
                />
              </FormLabel>
            </Box>
            <Input type={'file'} id="avatar" display={'none'} />
          </AvatarBadge>
        </Avatar>
      </Box>
      <FormInput
        textLabel={'Tên người dùng'}
        isEditable={true}
        defaultValue={props.userData?.nameUser}
      />
      <FormInput
        textLabel={'Địa chỉ'}
        placeholder={'123 XYZ Street'}
        isEditable={true}
        defaultValue={props.userData?.address}
      />
      <FormInput
        textLabel={'Số điện thoại'}
        placeholder={'09xxxxx'}
        isEditable={true}
        defaultValue={props.userData?.phone}
      />

      <ButtonCustom
        textDisplay={'Lưu thông tin'}
        onClick={() => {
          console.log();
        }}
        width={'100%'}
        mt={'.5rem'}
      />
    </Flex>
  );
};

export default Profile;
