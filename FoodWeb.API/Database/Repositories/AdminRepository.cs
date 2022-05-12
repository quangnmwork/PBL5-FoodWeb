using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;
using FoodWeb.API.Extensions;
using FoodWeb.API.Services;
using PagedList;

namespace FoodWeb.API.Database.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IAuthorizeService _authorizeService;

        public AdminRepository(DataContext context,
                               IMapper mapper,
                               IAuthorizeService authorizeService)
        {
            this._context = context;
            this._mapper = mapper;
            this._authorizeService = authorizeService;
        }

        public int GetToTalPageAllProfileByNameGroup(string nameGroup)
        {
            var users = _context.Users;
            List<ProfileDTO> data = new List<ProfileDTO>();
            foreach(var item in users){
                var nameGroupUser = _authorizeService.GetGroupById(item.IdUser);
                if(nameGroupUser == nameGroup.ToLower()){
                    data.Add(_mapper.Map<User, ProfileDTO>(item));
                }
            }

            return (int)Math.Ceiling(1.0*data.Count()/PageServiceExtensions.ProfilePageSize);
        }

        public IEnumerable<ProfileDTO> GetAllProfileByNameGroupPaging(int numberPage, string nameGroup)
        {
            var users = _context.Users;
            List<ProfileDTO> data = new List<ProfileDTO>();
            foreach(var item in users){
                var nameGroupUser = _authorizeService.GetGroupById(item.IdUser);
                if(nameGroupUser == nameGroup.ToLower()){
                    var profile = _mapper.Map<User, ProfileDTO>(item);
                    profile.NameGroup = nameGroup;
                    data.Add(profile);
                }
            }

            return data.OrderBy(u => u.IdUser)
                       .ToPagedList(numberPage, PageServiceExtensions.ProfilePageSize);
        }

        public int GetTotalPageListUsersSearchPaging(SearchDTO searchDTO)
        {
            List<ProfileDTO> data = new List<ProfileDTO>();
            foreach(var user in _context.Users){
                if(_authorizeService.GetGroupById(user.IdUser).ToLower() == searchDTO.NameGroup.ToLower())
                    data.Add(_mapper.Map<ProfileDTO>(user));
            }

            int number = data.Where(u => u.NameUser.ToLower().Contains(searchDTO.KeyName.ToLower()) 
                                         || u.Address.ToLower().Contains(searchDTO.KeyName.ToLower()) 
                                         || u.Phone.ToLower().Contains(searchDTO.KeyName.ToLower())).Count();

            return (int)Math.Ceiling(1.0*number / PageServiceExtensions.ProfilePageSize);
            
        }

        public IEnumerable<ProfileDTO> GetListUsersSearchPaging(int numberPage, SearchDTO searchDTO)
        {
            List<ProfileDTO> data = new List<ProfileDTO>();
            foreach(var user in _context.Users){
                if(_authorizeService.GetGroupById(user.IdUser).ToLower() == searchDTO.NameGroup.ToLower())
                    data.Add(_mapper.Map<ProfileDTO>(user));
            }

            return data.Where(u => u.NameUser.ToLower().Contains(searchDTO.KeyName.ToLower()) 
                                         || u.Address.ToLower().Contains(searchDTO.KeyName.ToLower()) 
                                         || u.Phone.ToLower().Contains(searchDTO.KeyName.ToLower()))
                        .OrderBy(u => u.IdUser)
                        .ToPagedList(numberPage, PageServiceExtensions.ProfilePageSize);;
        }

        public IEnumerable<OrderDTO> GetListOrderShipperChoice(int IdShipper)
        {
            return _context.OrderDetails.Where(u => u.ShipperId == IdShipper && u.ChoiceShip == true && u.IsShip == false)
                                        .ProjectTo<OrderDTO>(_mapper.ConfigurationProvider);
        }

        // public GroupDetailDTO BanShipper(BanUserDTO BanUserDTO)
        // {
        //     var user = _context.Users.FirstOrDefault(u => u.IdUser == BanUserDTO.IdUser);
        //     var account = _context.Accounts.FirstOrDefault(u => u.UserId == user.IdUser);
        //     var groupDetail = _context.GroupDetails.FirstOrDefault(u => u.AccountId == account.IdAccount);

        //     groupDetail.EnableGroupDetail = false;
        //     groupDetail.TimeEnable = BanUserDTO.TimeEnable;
        //     groupDetail.DescriptionBan = BanUserDTO.DescriptionBan;

        //     _context.SaveChanges();
        //     return _mapper.Map<GroupDetailDTO>(groupDetail);
        // }

        public GroupDetailDTO BanGroup(BanUserDTO BanUserDTO)
        {
            var user = _context.Users.FirstOrDefault(u => u.IdUser == BanUserDTO.IdUser);
            var account = _context.Accounts.FirstOrDefault(u => u.UserId == user.IdUser);
            var groupDetail = _context.GroupDetails.FirstOrDefault(u => u.AccountId == account.IdAccount);

            groupDetail.EnableGroupDetail = false;
            groupDetail.TimeEnable = BanUserDTO.TimeEnable;
            groupDetail.DescriptionBan = BanUserDTO.DescriptionBan;

            var foods = _context.Foods.Where(u => u.UserId == BanUserDTO.IdUser);
            foreach(var food in foods){
                food.isAdminHidden = true;
            }
            
            _context.SaveChanges();
            return _mapper.Map<GroupDetailDTO>(groupDetail);
        }

        public GroupDetailDTO UnBanGroup(int Id)
        {
            var user = _context.Users.FirstOrDefault(u => u.IdUser == Id);
            var account = _context.Accounts.FirstOrDefault(u => u.UserId == user.IdUser);
            var groupDetail = _context.GroupDetails.FirstOrDefault(u => u.AccountId == account.IdAccount);

            groupDetail.EnableGroupDetail = true;
            groupDetail.TimeEnable = null;
            groupDetail.DescriptionBan = null;

            var foods = _context.Foods.Where(u => u.UserId == Id);
            foreach(var food in foods){
                food.isAdminHidden = false;
            }

            _context.SaveChanges();

            return _mapper.Map<GroupDetailDTO>(groupDetail);
        }

        public GroupDetailDTO EditBanGroup(BanUserDTO BanUserDTO)
        {
            var user = _context.Users.FirstOrDefault(u => u.IdUser == BanUserDTO.IdUser);
            var account = _context.Accounts.FirstOrDefault(u => u.UserId == user.IdUser);
            var groupDetail = _context.GroupDetails.FirstOrDefault(u => u.AccountId == account.IdAccount);

            _mapper.Map(BanUserDTO, groupDetail);
            _context.SaveChanges();

            return _mapper.Map<GroupDetailDTO>(groupDetail);
        }

        public IEnumerable<PermissionDetailDTO> GetListPermissionDetail()
        {
            return _context.PermissionDetails.ProjectTo<PermissionDetailDTO>(_mapper.ConfigurationProvider);
        }

        public PermissionDetailDTO SetBanPermission(BanPermissionDTO banPermissionDTO)
        {
            var permissionDetail = _context.PermissionDetails.FirstOrDefault(u => u.CodePermissionDetail == banPermissionDTO.CodePermissionDetail);
            if(permissionDetail == null)    return null;

            var group = _context.Groups.FirstOrDefault(u => u.IdGroup == permissionDetail.GroupId);
            var permission = _context.Permissions.FirstOrDefault(u => u.IdPermission == permissionDetail.PermissionId);
            
            permissionDetail.EnablePermissionDetail = banPermissionDTO.EnableGroupDetail;

            _context.SaveChanges();
            return _mapper.Map<PermissionDetail, PermissionDetailDTO>(permissionDetail);
        }

        public PermissionDetailDTO GetPermissionDetailByCode(string code)
        {
            var permissionDetail = _context.PermissionDetails.FirstOrDefault(u => u.CodePermissionDetail == code);
            if(permissionDetail == null)    return null;
            
            var group = _context.Groups.FirstOrDefault(u => u.IdGroup == permissionDetail.GroupId);
            var permission = _context.Permissions.FirstOrDefault(u => u.IdPermission == permissionDetail.PermissionId);

            return _mapper.Map<PermissionDetailDTO>(permissionDetail);
        }

        public GroupDetailDTO CheckBanGroup(int IdUser){
            var account = _context.Accounts.FirstOrDefault(u => u.UserId == IdUser);
            var groupDetail = _context.GroupDetails.FirstOrDefault(u => u.AccountId == account.IdAccount);

            return _mapper.Map<GroupDetailDTO>(groupDetail);
        }
    }
}