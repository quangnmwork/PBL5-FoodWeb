using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;

namespace FoodWeb.API.Database.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public PaymentRepository(DataContext context, IMapper mapper){
            this._context = context;
            this._mapper = mapper;
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

        public PaymentDTO GetPaymentById(int IdPayment)
        {
            return _mapper.Map<PaymentDTO>(_context.Payments.FirstOrDefault(u => u.IdPayment == IdPayment));
        }
    }
}