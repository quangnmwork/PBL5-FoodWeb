namespace FoodWeb.API.Database.Entities
{
    public class PermissionDetail
    {
        public int IdPermissionDetail { get; set; }

        public string DescriptionPermissionDetail { get; set; }

        public string CodePermissionDetail { get; set; }

        public bool EnablePermissionDetail { get; set; }

        public int GroupId { get; set; }
        public virtual Group Group { get; set; }

        public int PermissionId { get; set; }
        public virtual Permission Permission { get; set; }
    }
}