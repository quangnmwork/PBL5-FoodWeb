using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FoodWeb.API.DTOs
{
    public class CreateFoodDTO
    {
        [Required]
        [MaxLength(150)]
        public string NameFood { get; set; }
        
        [Required]
        public double PriceFood { get; set;}

        [Required]
        public bool isHidden { get; set; }

        [Required]
        public string DescriptionFood { get; set; }

        [Required]
        public string ImageFood { get; set; }
        
        [Required]
        public int CategoryId { get; set; }
        
    }
}