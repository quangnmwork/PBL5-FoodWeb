using System.Collections.Generic;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.DTOs;

namespace FoodWeb.API.Database.IRepositories
{
    public interface IUserRepository
    {
        public void CreateUser(RegisterDTO registerDTO);

        public IEnumerable<User> GetAllUsers();

        public User GetUserByName(string name);

        public User GetUserById(int Id);

        public bool SaveChanges();

        public void  UpdateProfile(int Id, CustomerDTO customer);

        public IEnumerable<SellerDTO> GetAllSellers();
    }
}