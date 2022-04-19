using System.Collections.Generic;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.DTOs;

namespace FoodWeb.API.Database.IRepositories
{
    public interface IUserRepository
    {
        public void CreateUser(RegisterDTO registerDTO);

        public IEnumerable<User> GetAllUsers();

        public IEnumerable<User> GetAllUsersByPaging(int page = 1, int pageSize = 3);

        public User GetUserByName(string name);

        public User GetUserById(int Id);

        public void  UpdateProfile(int Id, UserDTO user);

        public IEnumerable<SellerDTO> GetAllSellersPaging(int numberPage);

        public int GetTotalPageSellers();

        public ProfileDTO GetProfileUserById(int Id);

        public bool CheckExistUserName(string userName);
    }
}