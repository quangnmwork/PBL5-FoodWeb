using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;

namespace FoodWeb.API.Database.Repositories
{
    public class UserRepository : IUserRepository
    {

        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper){
            this._context = context;
            this._mapper = mapper;
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
        public bool SaveChanges(){
            return (_context.SaveChanges() > 0);
        }
        public void UpdateProfile(int Id, CustomerDTO customerDto){
            var user = GetUserById(Id);
            // Console.WriteLine(user.ToString());
            // Console.WriteLine(customerDto.ToString());
            if (user == null) return;
            _mapper.Map(customerDto,user);
        }
    }
}