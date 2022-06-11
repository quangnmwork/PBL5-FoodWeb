import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  MenuButtonProps
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/authentication/useUser';
import { useCart } from '../../services/cart/useCart';
import clientStorage from '../../utils/clientStorage';
import { MAX_TIME } from '../../utils/constants';
import { DynamicObject } from './../../models/DynamicObject.model';
interface AvatarCustomProps extends MenuButtonProps {
  userData?: DynamicObject;
}

const AvatarCustom = (props: AvatarCustomProps) => {
  const { ...rest } = props;
  const cart = useCart();
  const { mutate } = useUser(MAX_TIME);
  const navigate = useNavigate();
  const handlerLogout = () => {
    clientStorage.getClientStorage().clearToken();
    navigate('../', { replace: true });
    mutate(undefined);
    cart.resetCart();
  };
  const handlerRouter = () => {
    navigate('/user/profile', { replace: true });
  };
  const handleAvatar = () => {
    if (props.userData?.avatar) return props.userData.avatar;
    if (props.userData?.nameGroup == 'Customer')
      return '/assets/user-avatar.jpg';
    if (props.userData?.nameGroup == 'Shipper') return '/assets/shipper.jpg';
    if (props.userData?.nameGroup == 'Seller') return '/assets/seller.jpg';
    if (props.userData?.nameGroup == 'Admin') return '/assets/admin.png';
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
