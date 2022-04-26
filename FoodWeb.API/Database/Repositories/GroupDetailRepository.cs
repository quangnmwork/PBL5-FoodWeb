using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;

namespace FoodWeb.API.Database.Repositories
{
    public class GroupDetailRepository : IGroupDetailRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public GroupDetailRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            this._mapper = mapper;
        }
        public void CreateGroupDetail(int idAccount, int idGroup)
        {
            var data = new GroupDetail{
                AccountId = idAccount,
                GroupId = idGroup,
                EnableGroupDetail = true,
            };

            _context.GroupDetails.Add(data);
            _context.SaveChanges();
        }

        public GroupDetail GetGroupDetailByIdAccount(int id)
        {
            return _context.GroupDetails.FirstOrDefault(s => s.AccountId == id);
        }

        public GroupDetailDTO GetGroupDetailByIdUser(int IdUser)
        {
            var account = _context.Accounts.FirstOrDefault(u => u.UserId == IdUser);
            var groupDetail = GetGroupDetailByIdAccount(account.IdAccount);

            return _mapper.Map<GroupDetailDTO>(groupDetail);
        }
    }
}