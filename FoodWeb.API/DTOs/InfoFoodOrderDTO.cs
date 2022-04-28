using System.ComponentModel.DataAnnotations;

namespace FoodWeb.API.DTOs
{
    public class InfoFoodOrderDTO
    {
        [Required]
        public int IdFood { get; set; }

        public string NameFood { get; set; }

        public string ImageFood { get; set; }
        
        [Required]
        public int NumberFood { get; set;}
    }
}