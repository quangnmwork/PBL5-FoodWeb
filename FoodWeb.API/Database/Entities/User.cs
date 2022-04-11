using System.Collections.Generic;

namespace FoodWeb.API.Database.Entities
{
    public class User
    {
        public int IdUser { get; set; }
        
        public string NameUser { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public double? Money { get; set; }

        public string Avatar { get; set; }

        public virtual Account Account { get; set; }

        public List<RoomDetail> RoomDetails { get; set; }
        
        public List<Food> Foods { get; set; }

        public List<OrderDetail> OrderDetails { get; set; }

        public override string ToString(){
            return IdUser + " " + NameUser + "\n";
        } 
    }
}