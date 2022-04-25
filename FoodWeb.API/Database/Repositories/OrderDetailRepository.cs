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
                CustomerId = IdUser,
                ShipperId = null,
                TimeOrderDetail = DateTime.Now,
                IsShip = false,
                TimeShipDone = null,
                ChoiceShip = false,
                CodeOrderDetail = CodeOrderDetail,
            };

            _context.OrderDetails.Add(orderDetail);
            _context.SaveChanges();

            return orderDetail;
        }

        public IEnumerable<OrderDTO> GetAllOrderDetailByIdUserShippedPaging(int IdUser, int numberPage)
        {
            return _context.OrderDetails.Where(u => u.CustomerId == IdUser && u.IsShip == true)
                                        .ProjectTo<OrderDTO>(_mapper.ConfigurationProvider)
                                        .OrderByDescending(u => u.TimeOrderDetail)
                                        .ToPagedList(numberPage, PageServiceExtensions.OrderDetailHistoryPageSize);
        }

        public IEnumerable<OrderDTO> GetAllOrderDetailByIdUserNotShippedYetPaging(int IdUser, int numberPage)
        {
            return _context.OrderDetails.Where(u => u.CustomerId == IdUser && u.IsShip == false)
                                        .ProjectTo<OrderDTO>(_mapper.ConfigurationProvider)
                                        .OrderByDescending(u => u.TimeOrderDetail)
                                        .ToPagedList(numberPage, PageServiceExtensions.OrderDetailHistoryPageSize);
        }

        public bool CheckExistListOrderWithIdUser(int IdUser, int IdOrderDetail)
        {
            var orderDetail = _context.OrderDetails.FirstOrDefault(u => (u.CustomerId == IdUser) && u.IdOrderDetail == IdOrderDetail);
            if(orderDetail == null)
                return false;
            return true;
        }

        public int GetTotalPageOrderDetailByIdUserShippedPaging(int IdUser)
        {
            var number = _context.OrderDetails.Where(u => u.CustomerId == IdUser && u.IsShip == true).Count();
            return (int)Math.Ceiling(1.0*number/PageServiceExtensions.OrderDetailHistoryPageSize);
        }

        public int GetTotalPageOrderDetailByIdUserNotShippedYetPaging(int IdUser)
        {
            var number = _context.OrderDetails.Where(u => u.CustomerId == IdUser && u.IsShip == false).Count();
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

        public void ChoiceShip(int IdShipper, ChoiceShipDTO choiceShipDTO)
        {
            var orderDetail = _context.OrderDetails.FirstOrDefault(u => u.IdOrderDetail == choiceShipDTO.IdOrderDetail);

            if(choiceShipDTO.ChoiceShip == true){
                orderDetail.ShipperId = IdShipper;
                orderDetail.ChoiceShip = true;
            }
            else{
                orderDetail.ShipperId = null;
                orderDetail.ChoiceShip = false;
            }

            _context.SaveChanges();
        }

        public OrderDTO GetOrderDetailById(int IdOrderDetail)
        {
            var orderDetail = _context.OrderDetails.FirstOrDefault(u => u.IdOrderDetail == IdOrderDetail);
            var room = _context.Rooms.FirstOrDefault(u => u.OrderDetailId == IdOrderDetail);
            var payment = _context.Payments.FirstOrDefault(u => u.OrderDetailId == IdOrderDetail);
            var data = _mapper.Map<OrderDTO>(orderDetail);
            data.IdRoom = room.IdRoom;
            data.IdPayment = payment.IdPayment;
            data.IdCustomer = orderDetail.CustomerId;

            return data;
        }

        public int CheckChoiceShip(int IdShipper, ChoiceShipDTO choiceShipDTO)
        {
            var orderDetail = _context.OrderDetails.FirstOrDefault(u => u.IdOrderDetail == choiceShipDTO.IdOrderDetail);
            if(orderDetail.ChoiceShip){ // nếu đã được chọn ship
                if(choiceShipDTO.ChoiceShip)    return 1;   // yêu cầu chuyển thành chọn ship -> false
                else{   // bỏ chọn ship
                    if(orderDetail.ShipperId != IdShipper)  return 2; //Nếu người yêu cầu bỏ ship ko phải là người chọn ship -> false
                }   
            }

            var number = _context.OrderDetails.Where(u => u.ShipperId == IdShipper && u.ChoiceShip == true && u.IsShip == false)
                                              .ProjectTo<OrderDTO>(_mapper.ConfigurationProvider).Count();

            if(number >= CommonServiceExtensions.LimitChoiceOrder)   return 3; // Nếu chọn quá số đơn hàng ship quá giới hạn thì sẽ ko được chọn thêm

            return 0;
        }

        public IEnumerable<OrderDTO> GetListOrderShipperChoice(int IdShipper)
        {
            return _context.OrderDetails.Where(u => u.ShipperId == IdShipper && u.ChoiceShip == true && u.IsShip == false)
                                        .ProjectTo<OrderDTO>(_mapper.ConfigurationProvider);
        }

        public void TickShip(int IdShipper, int IdOrderDetail)
        {
            var orderDetail = _context.OrderDetails.FirstOrDefault(u => u.IdOrderDetail == IdOrderDetail);
            orderDetail.IsShip = true;
            orderDetail.TimeShipDone = DateTime.Now;
            
            var payment = _context.Payments.FirstOrDefault(u => u.OrderDetailId == IdOrderDetail);

            //shipper được tăng tiền
            var shipper = _context.Users.FirstOrDefault(u => u.IdUser == IdShipper);
            shipper.Money += payment.PriceShip;  

            //seller được tăng tiền
            var listOrderDetail = _context.ListOrders.Where(u => u.OrderDetailId == IdOrderDetail);
            foreach(var item in listOrderDetail){
                var food = _context.Foods.FirstOrDefault(u => u.IdFood == item.FoodId);
                var seller = _context.Users.FirstOrDefault(u => u.IdUser == food.UserId);

                seller.Money += food.PriceFood*item.Number;
            }

            _context.SaveChanges();
        }

        public bool CheckTickShip(int IdShipper, int IdOrderDetail)
        {
            var orderDetail = _context.OrderDetails.FirstOrDefault(u => u.IdOrderDetail == IdOrderDetail);
            if(IdShipper == orderDetail.ShipperId)
                return true;
            return false;
        }
    }
}