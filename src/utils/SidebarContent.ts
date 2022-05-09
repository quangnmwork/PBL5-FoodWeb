import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineShoppingCart
} from 'react-icons/ai';
import { FaShippingFast, FaBloggerB } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { MdOutlineSell } from 'react-icons/md';
export function getSideBarContent(
  nameGroup: 'Customer' | 'Shipper' | 'Admin' | 'Seller'
) {
  const customerSidebar = [
    { icon: AiOutlineHome, iconText: 'Trang chủ', linkTo: '/' },
    {
      icon: AiOutlineUser,
      iconText: 'Thông tin cá nhân',
      linkTo: '/user/profile'
    },
    {
      icon: AiOutlineSetting,
      iconText: 'Bảo mật',
      linkTo: '/user/security'
    },
    {
      icon: AiOutlineShoppingCart,
      iconText: 'Quản lý đơn hàng',
      linkTo: '/user/history-order'
    }
  ];
  const shipperSidebar = [
    {
      icon: AiOutlineUser,
      iconText: 'Thông tin cá nhân',
      linkTo: '/user/profile'
    },
    {
      icon: AiOutlineSetting,
      iconText: 'Bảo mật',
      linkTo: '/user/security'
    },
    {
      icon: AiOutlineShoppingCart,
      iconText: 'Đơn hàng chờ ship',
      linkTo: '/user/not-ship'
    },
    {
      icon: FaShippingFast,
      iconText: 'Đơn hàng của bạn',
      linkTo: '/user/my-ship'
    }
  ];
  const sellerSidebar = [
    {
      icon: AiOutlineUser,
      iconText: 'Thông tin cá nhân',
      linkTo: '/user/profile'
    },
    {
      icon: AiOutlineSetting,
      iconText: 'Bảo mật',
      linkTo: '/user/security'
    },
    {
      icon: FaBloggerB,
      iconText: 'Quản lý món ăn',
      linkTo: '/user/my-foods'
    }
  ];
  const adminSidebar = [
    {
      icon: AiOutlineUser,
      iconText: 'Thông tin cá nhân',
      linkTo: '/user/profile'
    },
    {
      icon: AiOutlineSetting,
      iconText: 'Bảo mật',
      linkTo: '/user/security'
    },
    {
      icon: FiUsers,
      iconText: 'Quản lý người dùng',
      linkTo: '/user/user-manage'
    },
    {
      icon: FaShippingFast,
      iconText: 'Quản lý shipper',
      linkTo: '/user/shipper-manage'
    },
    {
      icon: MdOutlineSell,
      iconText: 'Quản lý Seller',
      linkTo: '/user/seller-manage'
    }
  ];
  if (nameGroup == 'Shipper') return shipperSidebar;
  if (nameGroup == 'Customer') return customerSidebar;
  if (nameGroup == 'Seller') return sellerSidebar;
  if (nameGroup == 'Admin') return adminSidebar;
}
