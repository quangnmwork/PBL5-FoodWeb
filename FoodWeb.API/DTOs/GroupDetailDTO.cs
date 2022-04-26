using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodWeb.API.DTOs
{
    public class GroupDetailDTO
    {
        public int IdAccount { get; set; }

        public bool EnableGroupDetail { get; set; }

        public DateTime? TimeEnable { get; set; }

        public string DescriptionBan { get; set; }
    }
}