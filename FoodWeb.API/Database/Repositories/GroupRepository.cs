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
            _context = context;

        }
        public Group GetGroupByName(string name)
        {
            return _context.Groups.FirstOrDefault(s => s.NameGroup == name);
        }

        public Group GetGroupById(int id)
        {
            return _context.Groups.FirstOrDefault(s => s.IdGroup == id);
        }
    }
}