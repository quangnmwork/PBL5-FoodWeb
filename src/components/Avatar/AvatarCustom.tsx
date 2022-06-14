import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  MenuButtonProps
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useSWRConfig } from 'swr';

import { useCart } from '../../services/cart/useCart';

import clientStorage from '../../utils/clientStorage';

import { DynamicObject } from './../../models/DynamicObject.model';
interface AvatarCustomProps extends MenuButtonProps {
  userData?: DynamicObject;
}

const AvatarCustom = (props: AvatarCustomProps) => {
  const { userData, ...rest } = props;
  const cart = useCart();
  const { mutate } = useSWRConfig();

  const navigate = useNavigate();
  const handlerLogout = () => {
    clientStorage.getClientStorage().clearToken();
    navigate('../', { replace: true });
    mutate('Users/GetProfileUser');

    cart.resetCart();
  };
  const handlerRouter = () => {
    navigate('/user/profile', { replace: true });
  };
  const handleAvatar = () => {
    if (userData?.avatar) return userData.avatar;
    if (userData?.nameGroup == 'Customer') return '/assets/user-avatar.jpg';
    if (userData?.nameGroup == 'Shipper') return '/assets/shipper.jpg';
    if (userData?.nameGroup == 'Seller') return '/assets/seller.jpg';
    if (userData?.nameGroup == 'Admin') return '/assets/admin.png';
  };
  return (
    <Menu>
      <MenuButton {...rest}>
        <Avatar src={handleAvatar()} size={'md'} />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handlerRouter}>Thông tin cá nhân</MenuItem>
        <MenuItem onClick={handlerLogout}>Đăng xuất</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AvatarCustom;
