using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;

namespace FoodWeb.API.Database.Repositories
{
    public class GroupDetailRepository : IGroupDetailRepository
    {
        private readonly DataContext _context;
        public GroupDetailRepository(DataContext context)
        {
            _context = context;

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

        public GroupDetail GetGroupByIdAccount(int id)
        {
            return _context.GroupDetails.FirstOrDefault(s => s.AccountId == id);
        }
    }
}