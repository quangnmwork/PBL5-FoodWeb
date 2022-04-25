using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FoodWeb.API.DTOs
{
    public class FoodForSellerDTO
    {
        [Required]
        public int IdFood { get; set; }

        public string NameFood { get; set; }
        
        public double PriceFood { get; set;}

        public DateTime TimeCreate { get; set; }

        public bool isHidden { get; set; }

        public string DescriptionFood { get; set; }

        public string ImageFood { get; set; }
        
        public string NameCategory { get; set; }
        
    }
}