using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodWeb.API.DTOs
{
    public class PaymentDTO
    {
        public DateTime? TimePayment { get; set; }

        public double PriceTotalFood { get; set; }

        public double PriceShip { get; set; }

        public bool IsPayment { get; set; }
    }
}