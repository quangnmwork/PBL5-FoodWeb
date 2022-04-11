using System.Collections.Generic;

namespace FoodWeb.API.Database.Entities
{
    public class Permission
    {
        public int IdPermission { get; set; }

        public string NamePermission { get; set; }

        public bool EnablePermission { get; set; }

        public List<PermissionDetail> PermissionDetails { get; set; }
    }
}