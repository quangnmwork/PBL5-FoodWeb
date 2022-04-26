using System;
using System.ComponentModel.DataAnnotations;

namespace FoodWeb.API.DTOs
{
    public class BanDTO
    {
        [Required]
        public int IdUser { get; set; }

        public DateTime TimeEnable { get; set; }

        public string DescriptionBan { get; set; }
    }
}