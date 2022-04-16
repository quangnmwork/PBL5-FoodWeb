using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;

namespace FoodWeb.API.Database.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly DataContext _context;

        public PaymentRepository(DataContext context){
            this._context = context;
        }

        public Payment CreatePayment(int IdOrderDetail, double money)
        {
            Random rand = new Random();

            var payment = new Payment{
                OrderDetailId = IdOrderDetail,
                TimePayment = null,
                PriceShip = rand.Next(20000, 100000),
                PriceTotalFood = money,
                IsPayment = false
            };

            _context.Payments.Add(payment);
            _context.SaveChanges();

            return payment;
        }
    }
}