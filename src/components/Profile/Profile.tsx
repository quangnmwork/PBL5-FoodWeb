import {
  Avatar,
  AvatarBadge,
  Box,
  FormLabel,
  Icon,
  Input,
  Flex,
  Spinner,
  useToast
} from '@chakra-ui/react';
import { AiOutlineCamera } from 'react-icons/ai';
import { DynamicObject } from '../../models/DynamicObject.model';
import ButtonCustom from '../Button/ButtonCustom';
import FormInput from '../Form/FormInput';
import { useForm } from 'react-hook-form';
import { signinInput, signupInput } from '../../models/Authentication.model';
import { createRef, useEffect, useState } from 'react';
import { userAPI } from '../../api/repositoryFactory';

interface ProfileProps {
  userData?: DynamicObject;
}

const Profile = (props: ProfileProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<signupInput | signinInput>();
  const userName = createRef<HTMLInputElement>();
  const address = createRef<HTMLInputElement>();
  const phone = createRef<HTMLInputElement>();
  const [selectAvatar, setSelectAvatar] = useState<File | undefined>();
  const [currentAvatar, setCurrentAvatar] = useState<string>();
  const toast = useToast();
  // console.log(props.userData);
  const updateUserProfileHandler = async (data: signupInput | signinInput) => {
    try {
      const submitData = data as Partial<signupInput>;
      const formData = new FormData();
      if (!submitData.nameUser?.length) {
        delete submitData.nameUser;
      }
      if (submitData.nameUser === props.userData?.nameUser) {
        delete submitData.nameUser;
      }
      if (!submitData.phone?.length) {
        delete submitData.phone;
      }
      if (!submitData.address?.length) {
        delete submitData.address;
      }
      if (selectAvatar) {
        formData.append('Avatar', selectAvatar);
      }
      if (submitData.nameUser) {
        formData.append('NameUser', submitData.nameUser);
      }
      if (submitData.phone) {
        formData.append('Phone', submitData.phone);
      }
      if (submitData.address) {
        formData.append('Address', submitData.address);
      }
      console.log(formData);
      const res = await userAPI.updateUserProfile(formData);
      if (res.status == 200) {
        toast({
          status: 'success',
          title: 'Cập nhật thành công',
          position: 'bottom-right',
          duration: 1500,
          variant: 'subtle'
        });
      }
    } catch (err: any) {
      toast({
        status: 'error',
        title: 'Cập nhật thất bại',
        position: 'bottom-right',
        duration: 1500
      });
    }
  };
  const onImageUploadChanging = (event: any) => {
    const currentTarget = event.target as HTMLInputElement;
    console.log(currentTarget);
    if (!currentTarget.files || currentTarget.files.length == 0) {
      setSelectAvatar(undefined);
      return;
    } else setSelectAvatar(currentTarget.files[0]);
    const url = URL.createObjectURL(currentTarget.files[0]);
    setCurrentAvatar(url);
  };
  useEffect(() => {
    if (!selectAvatar) return;
    return () => URL.revokeObjectURL(URL.createObjectURL(selectAvatar));
  }, [selectAvatar]);

  return (
    <Flex
      direction={'column'}
      maxWidth={{ base: '95%', md: '80%', lg: '50%' }}
      mx={'auto'}
    >
      {!Object.keys(props?.userData || {})?.length ? (
        <Spinner
          alignSelf={'center'}
          mt={'10rem'}
          color="main.100"
          size="xl"
          justifySelf={'center'}
        />
      ) : (
        <>
          <Box alignSelf={'center'} mb={'1rem'}>
            <Avatar
              src={currentAvatar || props.userData?.avatar}
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
                <Input
                  type={'file'}
                  id="avatar"
                  display={'none'}
                  accept="image/*"
                  onChange={onImageUploadChanging}
                />
              </AvatarBadge>
            </Avatar>
          </Box>
          <FormInput
            textLabel={'Tên người dùng'}
            isEditable={true}
            defaultValue={props.userData?.nameUser}
            register={register}
            ref={userName}
            errorMessage={'nameUser' in errors ? errors.nameUser?.message : ''}
            nameRegister={'nameUser'}
          />
          <FormInput
            textLabel={'Địa chỉ'}
            isEditable={true}
            defaultValue={props.userData?.address}
            ref={address}
            register={register}
            nameRegister={'address'}
          />
          <FormInput
            textLabel={'Số điện thoại'}
            isEditable={true}
            defaultValue={props.userData?.phone}
            ref={phone}
            register={register}
            nameRegister={'phone'}
          />

          <ButtonCustom
            textDisplay={'Lưu thông tin'}
            onClick={handleSubmit(updateUserProfileHandler)}
            width={'100%'}
            mt={'.5rem'}
            isLoading={isSubmitting}
          />
        </>
      )}
    </Flex>
  );
};

export default Profile;
