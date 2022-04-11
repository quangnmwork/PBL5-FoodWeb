using System.ComponentModel.DataAnnotations;

namespace FoodWeb.API.DTOs
{
    public class SellerDTO
    {
        [Required]
        public int IdUser { get; set; }
        
        [Required]
        [StringLength(50)]
        public string NameUser { get; set; }

        [Required]
        [StringLength(10)]
        public string Phone { get; set; }

        [Required]
        [StringLength(100)]
        public string Address { get; set; }

        [Required]
        public double? Money { get; set; }

        [Required]
        public string Avatar { get; set; }
    }
}