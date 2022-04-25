using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodWeb.API.DTOs
{
    public class ChangePasswordDTO
    {
        public string OldPassword { get; set; }

        public string NewPassword { get; set; }
    }
}