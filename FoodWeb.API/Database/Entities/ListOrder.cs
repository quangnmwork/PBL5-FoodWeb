namespace FoodWeb.API.Database.Entities
{
    public class ListOrder
    {
        public int IdListOrder { get; set; }

        public int Number { get; set; }

        public int FoodId { get; set; }
        public virtual Food Food { get; set; }

        public int OrderDetailId { get; set; }
        public virtual OrderDetail OrderDetail { get; set; }
    }
}