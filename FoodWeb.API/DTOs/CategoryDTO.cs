using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FoodWeb.API.DTOs
{
    public class CategoryDTO
    {
        [Required]
        public int IdCategory { get; set; }

        [Required]
        [StringLength(50)]
        public string NameCategory { get; set; }
    }
}