using System.Collections.Generic;

namespace FoodWeb.API.Database.Entities
{
    public class Group
    {
        public int IdGroup { get; set; }

        public string NameGroup { get; set; }

        public List<GroupDetail> GroupDetails { get; set; }
        public List<PermissionDetail> PermissionDetails { get; set; }
    }
}