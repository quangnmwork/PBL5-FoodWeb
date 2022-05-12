using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodWeb.API.DTOs
{
    public class SearchDTO
    {
        public string NameCategory { get; set; }

        public string KeyName { get; set; }

        public string NameGroup { get; set; }
    }
}