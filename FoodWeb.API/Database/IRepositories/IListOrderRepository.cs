using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodWeb.API.DTOs;

namespace FoodWeb.API.Database.IRepositories
{
    public interface IListOrderRepository
    {
        public void CreateListOrder(int OrderDetailId, InfoFoodOrderDTO infoFood);

        public IEnumerable<InfoFoodOrderDTO> GetListFoodOrder(int IdOrderDetail);
    }
}