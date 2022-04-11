using System.Collections.Generic;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.DTOs;

namespace FoodWeb.API.Database.IRepositories
{
    public interface IAccountRepository
    {
        public void CreateAccount(RegisterDTO registerDTO);

        public IEnumerable<Account> GetAllAccounts();

        public Account GetAccountByEmail(string email);

        public Account GetAccountByUserId(int Id);

    }
}