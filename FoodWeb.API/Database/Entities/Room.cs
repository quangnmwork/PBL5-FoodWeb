using System.Collections.Generic;

namespace FoodWeb.API.Database.Entities
{
    public class Room
    {
        public int IdRoom { get; set; }
        
        public string NameRoom { get; set; }

        public List<RoomDetail> RoomDetails { get; set; }

        public int OrderDetailId { get; set; }
        public virtual OrderDetail OrderDetail { get; set; }
    }
}