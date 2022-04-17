using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;
using Microsoft.EntityFrameworkCore;
using PagedList;

namespace FoodWeb.API.Database.Repositories
{
    public class UserRepository : IUserRepository
    {

        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }

        public void CreateUser(RegisterDTO registerDTO)
        {
            var user = new User
            {
                NameUser = registerDTO.NameUser,
                Phone = registerDTO.Phone,
                Address = registerDTO.Address,
            };

            if (registerDTO.NameGroup.ToLower() == "seller" || registerDTO.NameGroup.ToLower() == "shipper")
                user.Money = 0;

            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users;
        }

        public User GetUserByName(string name)
        {
            return _context.Users.FirstOrDefault(s => s.NameUser == name);
        }

        public User GetUserById(int Id)
        {
            return _context.Users.Find(Id);
        }

        public void UpdateProfile(int Id, CustomerDTO customerDto)
        {
            var updateUser = GetUserById(Id);
            // Console.WriteLine(updateUser.ToString());
            // Console.WriteLine(customerDto.ToString());
            if (updateUser == null) return;
            if (customerDto.NameUser != null)
            {
                foreach (var user in GetAllUsers())
                {
                    if (customerDto.NameUser == user.NameUser){
                        return;
                    }
                }
            }
            _mapper.Map(customerDto, updateUser);
            _context.SaveChanges();
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
            foreach (var user in _context.Users)
            {
                if (GetNameGroupByNameUser(user.NameUser) == "Seller")
                    data.Add(_mapper.Map<SellerDTO>(user));
            }
            return data;
        }

        public ProfileDTO GetProfileUserById(int Id)
        {
            var profile = _mapper.Map<ProfileDTO>(_context.Users.FirstOrDefault(s => s.IdUser == Id));
            profile.NameGroup = GetNameGroupByNameUser(profile.NameUser);
            return profile;
        }

        public IEnumerable<User> GetAllUsersByPaging(int page = 1, int pageSize = 3)
        {
            return _context.Users.OrderBy(s => s.IdUser).ToPagedList(page, pageSize).Skip(2).Take(pageSize);
        }
    }
}