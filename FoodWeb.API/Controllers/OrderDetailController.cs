using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;
using FoodWeb.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodWeb.API.Controllers
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
        private readonly IAuthorizeService _authorizeService;
        private readonly IMapper _mapper;

        public OrderDetailController(IOrderDetailRepository orderDetailRepository,
                                     IRoomRepository roomRepository,
                                     IPaymentRepository paymentRepository,
                                     IFoodRepository foodRepository,
                                     IListOrderRepository listOrderRepository,
                                     IAuthorizeService authorizeService,
                                     IMapper mapper)
        {
            this._paymentRepository = paymentRepository;
            this._foodRepository = foodRepository;
            this._listOrderRepository = listOrderRepository;
            this._authorizeService = authorizeService;
            this._mapper = mapper;
            this._roomRepository = roomRepository;
            this._orderDetailRepository = orderDetailRepository;
        }

        [HttpPost("createOrder")]
        public ActionResult<OrderDTO> CreateOrder(List<InfoFoodOrderDTO> ListInfoFood)
        {
            OrderDTO orderDTO = new OrderDTO();

            var Id = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if(!_authorizeService.IsCustommer(Int32.Parse(Id)))
                return BadRequest("Action only customer");

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

        [HttpGet("getAllOrder/page-{numberPage}")]
        public ActionResult<IEnumerable<OrderDTO>> GetListOrder(int numberPage)
        {
            var Id = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if(!_authorizeService.IsCustommer(Int32.Parse(Id)))
                return BadRequest("Action only customer");
            
            if(numberPage > _orderDetailRepository.GetTotalPageOrderDetailByIdUserPaging(Int32.Parse(Id)))
                return NotFound("Page is not exist");

            return Ok(_orderDetailRepository.GetAllOrderDetailByIdUserPaging(Int32.Parse(Id), numberPage));
        }

        [HttpGet("getTotalPageListOrder")]
        public ActionResult<int> GetTotalPageListOrder()
        {
            var Id = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if(!_authorizeService.IsCustommer(Int32.Parse(Id)))
                return BadRequest("Action only customer");

            return Ok(_orderDetailRepository.GetTotalPageOrderDetailByIdUserPaging(Int32.Parse(Id)));
        }

        [HttpGet("getListFoodOrder/{IdOrderDetail}")]
        public ActionResult<IEnumerable<InfoFoodOrderDTO>> GetListFoodOrder(int IdOrderDetail)
        {
            var Id = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if(!_authorizeService.IsCustommer(Int32.Parse(Id)))
                return BadRequest("Action only customer");
            
            if(!_orderDetailRepository.CheckExistListOrderWithIdUser(Int32.Parse(Id), IdOrderDetail))
                return NotFound("No exist list order");

            return Ok(_listOrderRepository.GetListFoodOrder(IdOrderDetail));
        }

        [HttpGet("getTotalPageChoiceShip")]
        public ActionResult<int> GetTotalPageChoiceShip()
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsShipper(Id))
                return BadRequest("Action only Shipper");

            return Ok(_orderDetailRepository.GetTotalPageOrderDetailByChoiceShip());
        }

        [HttpGet("getListOrderDetailChoiceShip/page-{numberPage}")]
        public ActionResult<IEnumerable<OrderDTO>> GetListOrderDetailChoiceShip(int numberPage)
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsShipper(Id))
                return BadRequest("Action only Shipper");

            return Ok(_orderDetailRepository.GetAllOrderDetailByChoiceShipPaging(numberPage));
        }

        [HttpPost("choiceShip")]
        public ActionResult<IEnumerable<OrderDetail>> ChoiceShip(ChoiceShipDTO choiceShipDTO)
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsShipper(Id))
                return BadRequest("Action only Shipper");

            if(!_orderDetailRepository.CheckChoiceShip(Id, choiceShipDTO))
                return BadRequest("This order has been choiced");

            _orderDetailRepository.ChoiceShip(Id, choiceShipDTO);

            return Ok(_orderDetailRepository.GetOrderDetailById(choiceShipDTO.IdOrderDetail));
        }
    }
}