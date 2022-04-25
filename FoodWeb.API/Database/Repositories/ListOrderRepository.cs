using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;

namespace FoodWeb.API.Database.Repositories
{
    public class ListOrderRepository : IListOrderRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ListOrderRepository(DataContext context, IMapper mapper){
            this._context = context;
            this._mapper = mapper;
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

        public IEnumerable<InfoFoodOrderDTO> GetListFoodOrder(int IdOrderDetail)
        {
            // var listOrder = _context.ListOrders.Where(u => u.OrderDetailId == IdOrderDetail);

            // List<InfoFoodOrderDTO> data = new List<InfoFoodOrderDTO>();

            // foreach(var item in listOrder){
            //     data.Fo
            // }

            return _context.ListOrders.Where(u => u.OrderDetailId == IdOrderDetail).ProjectTo<InfoFoodOrderDTO>(_mapper.ConfigurationProvider);
        }
    }
}