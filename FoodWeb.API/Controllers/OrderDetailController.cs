using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;
using FoodWeb.API.Extensions;
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

        [HttpPost("createOrder")]   // customer tạo order
        public ActionResult<OrderDTO> CreateOrder(List<InfoFoodOrderDTO> ListInfoFood)
        {
            OrderDTO orderDTO = new OrderDTO();

            var Id = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if(!_authorizeService.IsCustommer(Int32.Parse(Id)))
                return BadRequest("Action only customer");

            foreach(var infoFood in ListInfoFood){
                if(_foodRepository.CheckIsHidden(infoFood.IdFood))
                    return BadRequest("Not found food or food is hidden");
            }

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

        [HttpGet("getTotalPageListOrderShipped")] // lấy tổng số trang các order detail trong lịch sử customer (các order detail đã ship)
        public ActionResult<int> GetTotalPageListOrderShipped()
        {
            var Id = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if(!_authorizeService.IsCustommer(Int32.Parse(Id)))
                return BadRequest("Action only customer");

            return Ok(_orderDetailRepository.GetTotalPageOrderDetailByIdUserShippedPaging(Int32.Parse(Id)));
        }

        [HttpGet("getAllOrderShipped/page-{numberPage}")]  //customer vào lịch sử lấy tất cả các order detail đã ship (phân trang)
        public ActionResult<IEnumerable<OrderDTO>> GetListOrder(int numberPage)
        {
            var Id = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if(!_authorizeService.IsCustommer(Int32.Parse(Id)))
                return BadRequest("Action only customer");
            
            if(numberPage > _orderDetailRepository.GetTotalPageOrderDetailByIdUserShippedPaging(Int32.Parse(Id)))
                return NotFound("Page is not exist");

            return Ok(_orderDetailRepository.GetAllOrderDetailByIdUserShippedPaging(Int32.Parse(Id), numberPage));
        }

        [HttpGet("getTotalPageListOrderNotShippedYet")] // lấy tổng số trang các order detail chưa ship (shipper chưa ship tới)
        public ActionResult<int> GetTotalPageListOrderNotShippedYet()
        {
            var Id = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if(!_authorizeService.IsCustommer(Int32.Parse(Id)))
                return BadRequest("Action only customer");

            return Ok(_orderDetailRepository.GetTotalPageOrderDetailByIdUserNotShippedYetPaging(Int32.Parse(Id)));
        }

        [HttpGet("getAllOrderNotShippedYet/page-{numberPage}")]  //customer vào lấy tất cả các order detail shipper chưa ship tới (phân trang)
        public ActionResult<IEnumerable<OrderDTO>> GetListOrderNotShippedYet(int numberPage)
        {
            var Id = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if(!_authorizeService.IsCustommer(Int32.Parse(Id)))
                return BadRequest("Action only customer");
            
            if(numberPage > _orderDetailRepository.GetTotalPageOrderDetailByIdUserNotShippedYetPaging(Int32.Parse(Id)))
                return NotFound("Page is not exist");

            return Ok(_orderDetailRepository.GetAllOrderDetailByIdUserNotShippedYetPaging(Int32.Parse(Id), numberPage));
        }

        [HttpGet("getListFoodOrder/{IdOrderDetail}")]   //customer xem chi tiết các food trong order detail mình đã tạo
                                                        //Shipper xem chi tiết các food trong tất cả các order detail 
        public ActionResult<IEnumerable<InfoFoodOrderDTO>> GetListFoodOrder(int IdOrderDetail)
        {
            var Id = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if(!_authorizeService.IsCustommer(Int32.Parse(Id)) && !_authorizeService.IsShipper(Int32.Parse(Id)))
                return BadRequest("Action is customer or shipper");
            
            var groupName = _authorizeService.GetGroupById(Int32.Parse(Id));
            if(groupName == "customer"){
                if(!_orderDetailRepository.CheckExistListOrderWithIdUser(Int32.Parse(Id), IdOrderDetail))
                    return NotFound("No exist list order");
            }

            return Ok(_listOrderRepository.GetListFoodOrder(IdOrderDetail));
        }

        [HttpGet("getTotalPageChoiceShip")]     // Lấy tổng số trang các order detail chưa được chọn ship
        public ActionResult<int> GetTotalPageChoiceShip()
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsShipper(Id))
                return BadRequest("Action only Shipper");

            return Ok(_orderDetailRepository.GetTotalPageOrderDetailByChoiceShip());
        }

        [HttpGet("getListOrderDetailChoiceShip/page-{numberPage}")]   // Lấy danh sách các order detail chưa được chọn ship cho shipper
        public ActionResult<IEnumerable<OrderDTO>> GetListOrderDetailChoiceShip(int numberPage)
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsShipper(Id))
                return BadRequest("Action only Shipper");

            return Ok(_orderDetailRepository.GetAllOrderDetailByChoiceShipPaging(numberPage));
        }

        [HttpPost("choiceShip")]    // Shipper click chọn ship
        public ActionResult<OrderDTO> ChoiceShip(ChoiceShipDTO choiceShipDTO)
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsShipper(Id))
                return BadRequest("Action only Shipper");

            if(_orderDetailRepository.CheckChoiceShip(Id, choiceShipDTO) == 1){
                return BadRequest("This order has been choiced");
            }
            else if(_orderDetailRepository.CheckChoiceShip(Id, choiceShipDTO) == 2){
                return Unauthorized("you have not permission");
            }
            else if(_orderDetailRepository.CheckChoiceShip(Id, choiceShipDTO) == 3){
                return BadRequest("The number of orders selected is more than " + CommonServiceExtensions.LimitChoiceOrder);
            }

            _orderDetailRepository.ChoiceShip(Id, choiceShipDTO);

            return Ok(_orderDetailRepository.GetOrderDetailById(choiceShipDTO.IdOrderDetail));
        }

        [HttpGet("getListOrderShipperChoice")]  // Shipper xem được các order detail mình đã chọn ship (nhưng chưa ship)
        public ActionResult<IEnumerable<OrderDTO>> GetListOrderShipperChoice()
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsShipper(Id))
                return BadRequest("Action only Shipper");
            
            return Ok(_orderDetailRepository.GetListOrderShipperChoice(Id));
        }

        [HttpGet("tickShip/{IdOrderDetail}")]   // Shipper click đã ship hàng xong
        public ActionResult<OrderDTO> TickShip(int IdOrderDetail)
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsShipper(Id))
                return BadRequest("Action only Shipper");

            if(!_orderDetailRepository.CheckTickShip(Id, IdOrderDetail))
                return Unauthorized("You have not permission");

            _orderDetailRepository.TickShip(Id, IdOrderDetail);

            return Ok(_orderDetailRepository.GetOrderDetailById(IdOrderDetail));
        }
    }
}