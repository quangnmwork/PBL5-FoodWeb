using System.Collections.Generic;
using System.Linq;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;

namespace FoodWeb.API.Database.Repositories
{
    public class UserRepository : IUserRepository
    {

        private readonly DataContext _context;

        public UserRepository(DataContext context){
            this._context = context;
        }

        public void CreateUser(RegisterDTO registerDTO)
        {
            var user = new User{
                NameUser = registerDTO.NameUser,
                Phone = registerDTO.Phone,
                Address = registerDTO.Address,
            };

            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users;
        }

        public User GetUserByName(string name){
            return _context.Users.FirstOrDefault(s => s.NameUser == name);
        }

        public User GetUserById(int Id)
        {
            return _context.Users.Find(Id);
        }
    }
}