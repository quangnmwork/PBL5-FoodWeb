using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodWeb.API.DTOs
{
    public class HiddenFoodDTO
    {
        public int IdFood { get; set; }

        public bool IsHidden { get; set; }
    }
}