import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  MenuButtonProps
} from '@chakra-ui/react';
import { DynamicObject } from './../../models/DynamicObject.model';
interface AvatarCustomProps extends MenuButtonProps {
  userData?: DynamicObject;
}

const AvatarCustom = (props: AvatarCustomProps) => {
  const { ...rest } = props;
  return (
    <Menu>
      <MenuButton {...rest}>
        <Avatar
          src={props.userData?.avatar || '/assets/user-avatar.jpg'}
          size={'md'}
        />
      </MenuButton>
      <MenuList>
        <MenuItem>Thông tin cá nhân</MenuItem>
        <MenuItem>Đăng xuất</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AvatarCustom;
