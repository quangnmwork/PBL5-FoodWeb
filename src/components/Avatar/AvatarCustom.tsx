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
import { DynamicObject } from './../../models/DynamicObject.model';
interface AvatarCustomProps extends MenuButtonProps {
  userData?: DynamicObject;
}

const AvatarCustom = (props: AvatarCustomProps) => {
  const { ...rest } = props;
  const cart = useCart();
  const { mutate } = useUser();
  const navigate = useNavigate();
  const handlerLogout = () => {
    clientStorage.getClientStorage().clearToken();
    mutate();
    cart.resetCart();
    navigate(0);
  };
  const handlerRouter = () => {
    navigate('/user/profile', { replace: true });
  };
  return (
    <Menu>
      <MenuButton {...rest}>
        <Avatar
          src={props.userData?.avatar || '/assets/user-avatar.jpg'}
          size={'md'}
        />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handlerRouter}>Thông tin cá nhân</MenuItem>
        <MenuItem onClick={handlerLogout}>Đăng xuất</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AvatarCustom;
