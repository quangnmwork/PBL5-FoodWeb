using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FoodWeb.API.DTOs
{
    public class CustomerDTO
    {
        // [Required]
        // public int IdUser { get; set; }
        
        // [Required]
        [StringLength(50)]
        public string NameUser { get; set; }

        // [Required]
        [StringLength(10)]
        public string Phone { get; set; }

        // [Required]
        [StringLength(100)]
        public string Address { get; set; }

        // [Required]
        public string Avatar { get; set; }

        public override string ToString(){
            return NameUser+ " " + Phone+ " " + Address + "\n";
        } 
    }
}