using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FoodWeb.API.Database.Entities
{
    public class UserDTO
    {
        [StringLength(100)]
        public string NameUser { get; set; }

        [StringLength(10)]
        public string Phone { get; set; }

        [StringLength(100)]
        public string Address { get; set; }

        public string Avatar { get; set; }

        public override string ToString()
        {
            return NameUser + " " + Phone + " " + Avatar + "\n" + Address;
        }
    }
}