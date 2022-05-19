using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodWeb.API.DTOs
{
    public class OrderDTO
    {
        public int IdOrderDetail { get; set; }

        public DateTime TimeOrderDetail { get; set; }
        
        public bool? IsShip { get; set; }

        public DateTime? TimeShipDone { get; set; }

        public bool? ChoiceShip { get; set; }

        public string CodeOrderDetail { get; set; }

        public int IdRoom { get; set; }

        public int IdPayment { get; set; }

        public int IdCustomer { get; set; }

        public int IdShipper { get; set; }

        public string NameCustomer { get; set; }

        public string NameShipper { get; set; }
    }
}