using System.Linq;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;

namespace FoodWeb.API.Database.Repositories
{
    public class GroupRepository : IGroupRepository
    {
        private readonly DataContext _context;

        public GroupRepository(DataContext context)
        {
            this._context = context;
        }
        public Group GetGroupByNameGroup(string name)
        {
            return _context.Groups.FirstOrDefault(s => s.NameGroup == name);
        }

        public Group GetGroupById(int id)
        {
            return _context.Groups.FirstOrDefault(s => s.IdGroup == id);
        }

        public string GetNameGroupByNameUser(string name)
        {
            var user = _context.Users.FirstOrDefault(u => u.NameUser == name);
            var account = _context.Accounts.FirstOrDefault(u => u.UserId == user.IdUser);
            return GetNameGroupByEmail(account.Email);
        }

        public string GetNameGroupByEmail(string email)
        {
            var account = _context.Accounts.FirstOrDefault(u => u.Email == email);
            var groupDetail = _context.GroupDetails.FirstOrDefault(u => u.AccountId == account.IdAccount);
            return GetGroupById(groupDetail.GroupId).NameGroup;
        }
    }
}