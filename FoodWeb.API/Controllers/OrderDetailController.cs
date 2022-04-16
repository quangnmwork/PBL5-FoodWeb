using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Namespace
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class OrderDetailController : ControllerBase
    {
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IRoomRepository _roomRepository;
        private readonly IPaymentRepository _paymentRepository;
        private readonly IFoodRepository _foodRepository;
        private readonly IListOrderRepository _listOrderRepository;
        private readonly IMapper _mapper;

        public OrderDetailController(IOrderDetailRepository orderDetailRepository,
                                     IRoomRepository roomRepository,
                                     IPaymentRepository paymentRepository,
                                     IFoodRepository foodRepository,
                                     IListOrderRepository listOrderRepository,
                                     IMapper mapper)
        {
            this._paymentRepository = paymentRepository;
            this._foodRepository = foodRepository;
            this._listOrderRepository = listOrderRepository;
            this._mapper = mapper;
            this._roomRepository = roomRepository;
            this._orderDetailRepository = orderDetailRepository;
        }

        [HttpPost]
        public ActionResult<OrderDTO> CreateOrder(List<InfoFoodOrderDTO> ListInfoFood)
        {
            OrderDTO orderDTO = new OrderDTO();

            var Id = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var CodeOrderDetail = DateTime.Now.ToString("ddMMyyyy-HHmmss-fff");
            
            var orderDetail = _orderDetailRepository.CreateOrderDetail(Int32.Parse(Id), CodeOrderDetail);
            var room = _roomRepository.CreateRoom(orderDetail.IdOrderDetail);

            double money = _foodRepository.PriceFoods(ListInfoFood);
            var payment = _paymentRepository.CreatePayment(orderDetail.IdOrderDetail, money);

            foreach(var infoFood in ListInfoFood){
                _listOrderRepository.CreateListOrder(orderDetail.IdOrderDetail, infoFood);
            }
            
            orderDTO = _mapper.Map<OrderDTO>(orderDetail);
            orderDTO.IdRoom = room.IdRoom;
            orderDTO.IdPayment = payment.IdPayment;

            return Ok(orderDTO);
        }
    }
}