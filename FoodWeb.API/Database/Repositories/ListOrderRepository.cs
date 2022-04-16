using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;

namespace FoodWeb.API.Database.Repositories
{
    public class ListOrderRepository : IListOrderRepository
    {
        private readonly DataContext _context;

        public ListOrderRepository(DataContext context){
            this._context = context;
        }

        public void CreateListOrder(int OrderDetailId, InfoFoodOrderDTO infoFood)
        {
            var listOrder = new ListOrder{
                FoodId = infoFood.IdFood,
                OrderDetailId = OrderDetailId,
                Number = infoFood.NumberFood
            };

            _context.ListOrders.Add(listOrder);
            _context.SaveChanges();
        }
    }
}