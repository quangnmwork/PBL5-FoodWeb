using System.Collections.Generic;

namespace FoodWeb.API.Database.Entities
{
    public class Account
    {
        public int IdAccount { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public List<GroupDetail> GroupDetails {get; set;}

        public int UserId { get; set; }
        public User User { get; set; }
    }
}