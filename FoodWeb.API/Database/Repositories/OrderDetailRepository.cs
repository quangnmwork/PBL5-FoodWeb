using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;
using FoodWeb.API.Extensions;
using PagedList;

namespace FoodWeb.API.Database.Repositories
{
    public class OrderDetailRepository : IOrderDetailRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public OrderDetailRepository(DataContext context, IMapper mapper){
            this._context = context;
            this._mapper = mapper;
        }

        public OrderDetail CreateOrderDetail(int IdUser, string CodeOrderDetail)
        {
            var orderDetail = new OrderDetail{
                UserId = IdUser,
                TimeOrderDetail = DateTime.Now,
                IsShip = false,
                TimeShipDone = null,
                ChoiceShip = false,
                CodeOrderDetail = CodeOrderDetail
            };

            _context.OrderDetails.Add(orderDetail);
            _context.SaveChanges();

            return orderDetail;
        }

        public IEnumerable<OrderDTO> GetAllOrderDetailByIdUserPaging(int IdUser, int numberPage)
        {
            return _context.OrderDetails.Where(u => u.UserId == IdUser)
                                        .ProjectTo<OrderDTO>(_mapper.ConfigurationProvider)
                                        .OrderByDescending(u => u.TimeOrderDetail)
                                        .ToPagedList(numberPage, PageServiceExtensions.OrderDetailHistoryPageSize);
        }

        
        public bool CheckExistListOrderWithIdUser(int IdUser, int IdOrderDetail)
        {
            var orderDetail = _context.OrderDetails.FirstOrDefault(u => u.UserId == IdUser && u.IdOrderDetail == IdOrderDetail);
            if(orderDetail == null)
                return false;
            return true;
        }

        public int GetTotalPageOrderDetailByIdUserPaging(int IdUser)
        {
            var number = _context.OrderDetails.Where(u => u.UserId == IdUser).Count();
            return (int)Math.Ceiling(1.0*number/PageServiceExtensions.OrderDetailHistoryPageSize);
        }

        public int GetTotalPageOrderDetailByChoiceShip()
        {
            var number = _context.OrderDetails.Where(u => u.ChoiceShip == false).Count();
            return (int)Math.Ceiling(1.0*number/ PageServiceExtensions.OrderDetailChoiceShipPageSize);
        }

        public IEnumerable<OrderDTO> GetAllOrderDetailByChoiceShipPaging(int numberPage)
        {
            return _context.OrderDetails.Where(u => u.ChoiceShip == false)
                                        .ProjectTo<OrderDTO>(_mapper.ConfigurationProvider)
                                        .OrderByDescending(u => u.TimeOrderDetail)
                                        .ToPagedList(numberPage, PageServiceExtensions.OrderDetailChoiceShipPageSize);
        }
    }
}