using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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
            return _context.Groups.FirstOrDefault(u => u.IdGroup == groupDetail.GroupId).NameGroup;
        }
        
        public IEnumerable<SellerDTO> GetAllSellers()
        {
            // return _context.Users.Where(u => (GetNameGroupByNameUser(u.NameUser) == "Seller"))
            //                      .ProjectTo<SellerDTO>(_mapper.ConfigurationProvider);

            List<SellerDTO> data = new List<SellerDTO>();
            foreach(var user in _context.Users){
                if(GetNameGroupByNameUser(user.NameUser) == "Seller")
                    data.Add(_mapper.Map<SellerDTO>(user));
            }
            return data;
        }
    }
}