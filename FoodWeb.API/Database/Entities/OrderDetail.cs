using System;
using System.Collections.Generic;

namespace FoodWeb.API.Database.Entities
{
    public class OrderDetail
    {
        public int IdOrderDetail { get; set; }

        public DateTime TimeOrderDetail { get; set; }
        
        public bool IsShip { get; set; }

        public DateTime? TimeShipDone { get; set; }

        public bool ChoiceShip { get; set; }

        public string CodeOrderDetail { get; set; }
        
        public int CustomerId { get; set; }
        public virtual User Customer { get; set; }

        public int? ShipperId { get; set; }
        public virtual User Shipper { get; set; }
    
        public virtual Payment Payment { get; set; }

        public virtual Room Room { get; set; }

        public List<ListOrder> ListOrders { get; set; }
    }
}