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
    }
}