using System;
using System.Collections.Generic;

namespace FoodWeb.API.Database.Entities
{
    public class Food
    {
        public int IdFood { get; set; }

        public string NameFood { get; set; }
        
        public double PriceFood { get; set;}

        public DateTime TimeCreate { get; set; }

        public string DescriptionFood { get; set; }

        public bool isHidden { get; set; }

        public bool isAdminHidden { get; set; }

        public string ImageFood { get; set; }
        
        public int UserId { get; set; }
        public virtual User User { get; set; }

        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }
        
        public List<ListOrder> ListOrders { get; set; }
    }
}