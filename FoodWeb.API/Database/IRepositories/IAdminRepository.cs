
using System.Collections.Generic;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.DTOs;

namespace FoodWeb.API.Database.IRepositories
{
    public interface IAdminRepository
    {
        public int GetToTalPageAllProfileByNameGroup(string nameGroup);

        public IEnumerable<ProfileDTO> GetAllProfileByNameGroupPaging(int numberPage, string nameGroup);

        public int GetTotalPageListUsersSearchPaging(SearchDTO searchDTO);

        public IEnumerable<ProfileDTO> GetListUsersSearchPaging(int numberPage, SearchDTO searchDTO);

        public IEnumerable<OrderDTO> GetListOrderShipperChoice(int IdShipper);

        //public GroupDetailDTO BanShipper(BanUserDTO BanUserDTO);

        public GroupDetailDTO BanGroup(BanUserDTO BanUserDTO);

        public GroupDetailDTO UnBanGroup(int Id);

        public GroupDetailDTO EditBanGroup(BanUserDTO BanUserDTO);

        public IEnumerable<PermissionDetailDTO> GetListPermissionDetail();

        public PermissionDetailDTO SetBanPermission(BanPermissionDTO banPermissionDTO);

        public PermissionDetailDTO GetPermissionDetailByCode(string code);

        public GroupDetailDTO CheckBanGroup(int IdUser);
    }
}