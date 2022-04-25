using System;

namespace FoodWeb.API.Database.Entities
{
    public class Payment
    {
        public int IdPayment { get; set; }

        public DateTime? TimePayment { get; set; }

        public double PriceTotalFood { get; set; }

        public double PriceShip { get; set; }

        public bool IsPayment { get; set; }

        public int OrderDetailId { get; set; }
        public virtual OrderDetail OrderDetail { get; set; }
    }
}