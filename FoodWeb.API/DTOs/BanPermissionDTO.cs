using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FoodWeb.API.DTOs
{
    public class BanPermissionDTO
    {
        [Required]
        public string CodePermissionDetail { get; set; }

        [Required]
        public bool EnableGroupDetail { get; set; }
    }
}