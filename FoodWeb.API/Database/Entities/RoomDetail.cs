using System;

namespace FoodWeb.API.Database.Entities
{
    public class RoomDetail
    {
        public int IdRoomDetail { get; set; }

        public string Message { get; set; }

        public DateTime? TimeChat { get; set; }

        public int RoomId { get; set; }
        public virtual Room Room { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}