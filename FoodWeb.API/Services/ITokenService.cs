using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodWeb.API.Database.Entities;

namespace FoodWeb.API.Services
{
    public interface ITokenService
    {
        public string CreateToken(User user);
    }
}