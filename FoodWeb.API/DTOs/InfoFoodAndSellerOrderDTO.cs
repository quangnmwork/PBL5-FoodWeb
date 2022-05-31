namespace FoodWeb.API.DTOs
{
    public class InfoFoodAndSellerOrderDTO
    {
        public int IdFood { get; set; }

        public string NameFood { get; set; }

        public string ImageFood { get; set; }
        
        public int NumberFood { get; set;}

        public int SellerId { get; set;}

        public string NameSeller { get; set;}

        public string Avatar { get; set; }
    }
}