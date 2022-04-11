using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodWeb.API.DTOs
{
    public class AccountResponse
    {
        public string Email { get; set; }

        public string NameUser { get; set; }

        public string NameGroup { get; set; }
        
        public string Token { get; set; }
    }
}