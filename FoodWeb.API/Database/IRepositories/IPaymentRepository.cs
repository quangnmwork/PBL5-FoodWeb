using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodWeb.API.Database.Entities;

namespace FoodWeb.API.Database.IRepositories
{
    public interface IPaymentRepository
    {
        public Payment CreatePayment(int IdOrderDetail, double money);
    }
}