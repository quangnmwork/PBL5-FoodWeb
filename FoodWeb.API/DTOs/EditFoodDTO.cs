using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FoodWeb.API.DTOs
{
    public class EditFoodDTO
    {
        public string NameFood { get; set; }
        
        public double PriceFood { get; set;}

        public string DescriptionFood { get; set; }

        public string ImageFood { get; set; }
        
        public int CategoryId { get; set; }
        
    }
}