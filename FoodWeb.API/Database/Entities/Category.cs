using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodWeb.API.Database.Entities
{
    public class Category
    {
        public int IdCategory { get; set; }
        public string NameCategory { get; set; }

        public List<Food> Foods { get; set; }

    }
}