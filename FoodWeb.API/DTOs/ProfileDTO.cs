using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FoodWeb.API.DTOs
{
    public class ProfileDTO
    {
        public string NameUser { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public string Avatar { get; set; }
    }
}