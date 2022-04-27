using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodWeb.API.DTOs
{
    public class PermissionDetailDTO
    {
        public string NamePermission { get; set; }

        public string NameGroup { get; set; }

        public string DescriptionPermissionDetail { get; set; }

        public bool EnablePermissionDetail { get; set; }

        public string CodePermissionDetail { get; set; }
    }
}