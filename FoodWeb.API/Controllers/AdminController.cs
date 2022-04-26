using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
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
    public class AdminController : ControllerBase
    {
        private readonly IAuthorizeService _authorizeService;
        private readonly IAdminRepository _adminRepository;

        public AdminController(IAuthorizeService authorizeService,
                               IAdminRepository adminRepository)
        {
            this._authorizeService = authorizeService;
            this._adminRepository = adminRepository;
        }

        [HttpGet("{nameGroup}/getToTalPage")]
        public ActionResult<int> GetToTalPageAllProfileByNameGroup(string nameGroup)
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsAdmin(Id))
                return BadRequest("Action only admin");
                
            return Ok(_adminRepository.GetToTalPageAllProfileByNameGroup(nameGroup));
        }

        [HttpGet("{nameGroup}/page-{numberPage}")]
        public ActionResult<IEnumerable<ProfileDTO>> GetAllProfileByNameGroupPaging(string nameGroup, int numberPage)
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsAdmin(Id))
                return BadRequest("Action only admin");

            return Ok(_adminRepository.GetAllProfileByNameGroupPaging(numberPage, nameGroup));
        }

        [HttpGet("{nameGroup}/search/getToTalPage")]    // lấy số trang search theo name, phone, address, group của các user (customer, shipper, seller)
        public ActionResult<int> GetToTalListUsersSearchPaging(string nameGroup, int numberPage)
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsAdmin(Id))
                return BadRequest("Action only admin");

            var searchDTO = new SearchDTO{
                NameGroup = nameGroup,
                NameUser = HttpContext.Request.Query["nameUser"].ToString(),
                Phone = HttpContext.Request.Query["phone"].ToString(),
                Address = HttpContext.Request.Query["address"].ToString(),
            };
            
            return Ok(_adminRepository.GetTotalPageListUsersSearchPaging(searchDTO));
        }

        [HttpGet("{nameGroup}/search/page-{numberPage}")]   // search theo name, phone, address, group của các user(customer, shipper, seller) phân trang
        public ActionResult<IEnumerable<ProfileDTO>> GetListUsersSearchPaging(string nameGroup, int numberPage)
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsAdmin(Id))
                return BadRequest("Action only admin");
                
            var searchDTO = new SearchDTO{
                NameGroup = nameGroup,
                NameUser = HttpContext.Request.Query["nameUser"].ToString(),
                Phone = HttpContext.Request.Query["phone"].ToString(),
                Address = HttpContext.Request.Query["address"].ToString(),
            };

            if(numberPage > _adminRepository.GetTotalPageListUsersSearchPaging(searchDTO))
                return NotFound("Page is not exist");

            return Ok(_adminRepository.GetListUsersSearchPaging(numberPage, searchDTO));
        }

        [HttpGet("getChoiceShip/{IdShipper}")]  // Admin xem các đơn hàng hiện shipper đang nhận ship
        public ActionResult<IEnumerable<OrderDTO>> GetListOrderShipperChoice(int IdShipper)
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsAdmin(Id))
                return BadRequest("Action only admin");
            
            if(!_authorizeService.IsShipper(IdShipper))
                return NotFound();

            return Ok(_adminRepository.GetListOrderShipperChoice(Id));
        }
    }
}