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
        private readonly IFoodRepository _foodRepository;

        public AdminController(IAuthorizeService authorizeService,
                               IAdminRepository adminRepository,
                               IFoodRepository foodRepository)
        {
            this._authorizeService = authorizeService;
            this._adminRepository = adminRepository;
            this._foodRepository = foodRepository;
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

            return Ok(_adminRepository.GetListOrderShipperChoice(IdShipper));
        }

        [HttpGet("getTotalPageListFoodOfSeller/{IdSeller}")]  // Lấy các food của 1 seller (có phân trang) dành cho admin
        public ActionResult<int> GetTotalPageListFoodOfSeller(int IdSeller)
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsAdmin(Id)){
                return BadRequest("Action only admin");
            }

            if(!_authorizeService.IsSeller(IdSeller)){
                return NotFound();
            }

            return Ok(_foodRepository.GetTotalPageFoodByIdSellerForSeller(IdSeller));
        }

        [HttpGet("getListFood/{IdSeller}/page-{numberPage}")]  // Lấy các food của 1 seller (có phân trang) dành cho admin
        public ActionResult<IEnumerable<FoodForSellerDTO>> GetListFoodOfSeller(int IdSeller, int numberPage)
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsAdmin(Id)){
                return BadRequest("Action only admin");
            }

            if(!_authorizeService.IsSeller(IdSeller)){
                return NotFound();
            }

            return Ok(_foodRepository.GetAllFoodByIdSellerForSellerPaging(IdSeller, numberPage));
        }

        [HttpPost("banUser")]   // ban chức năng của seller, shipper
        public ActionResult<GroupDetailDTO> BanUser(BanUserDTO BanUserDTO)
        {
            var groupDetail = new GroupDetailDTO();
            int IdAdmin = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if(!_authorizeService.IsAdmin(IdAdmin))
                return BadRequest("Action only admin");

            if(!_authorizeService.IsSeller(BanUserDTO.IdUser) && !_authorizeService.IsShipper(BanUserDTO.IdUser))
                return NotFound();

            if(_authorizeService.IsShipper(BanUserDTO.IdUser)){
                if(_adminRepository.GetListOrderShipperChoice(BanUserDTO.IdUser).ToList().Count() != 0){
                    return BadRequest("This shipper is currently delivering");
                }

                groupDetail = _adminRepository.BanGroup(BanUserDTO);
            }

            if(_authorizeService.IsSeller(BanUserDTO.IdUser)){
                groupDetail = _adminRepository.BanGroup(BanUserDTO);
            }

            return Ok(groupDetail);
        }

        [HttpPost("unBanUser/{Id}")]  // mở ban chức năng của seller, shipper
        public ActionResult<GroupDetailDTO> UnBanUser(int Id)
        {
            var groupDetail = new GroupDetailDTO();
            int IdAdmin = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if(!_authorizeService.IsAdmin(IdAdmin))
                return BadRequest("Action only admin");

            if(!_authorizeService.IsSeller(Id) && !_authorizeService.IsShipper(Id))
                return NotFound();

            groupDetail = _adminRepository.UnBanGroup(Id);

            return Ok(groupDetail);
        }

        [HttpPatch("editBanUser")]  // chỉnh sửa ban chức năng của seller, shipper
        public ActionResult<GroupDetailDTO> EditBanUser(BanUserDTO BanUserDTO)
        {
            int IdAdmin = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if(!_authorizeService.IsAdmin(IdAdmin))
                return BadRequest("Action only admin");

            if(!_authorizeService.IsSeller(BanUserDTO.IdUser) && !_authorizeService.IsShipper(BanUserDTO.IdUser))
                return NotFound();
            
            var groupDetail = _adminRepository.EditBanGroup(BanUserDTO);
            return Ok(groupDetail);
        }
        
        [HttpGet("getListPermissionDetail")]       //Lấy list các permission detail
        public ActionResult<IEnumerable<PermissionDetailDTO>> GetListPermissionDetail()
        {
            int IdAdmin = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if(!_authorizeService.IsAdmin(IdAdmin))
                return BadRequest("Action only admin");
            
            return Ok(_adminRepository.GetListPermissionDetail());
        }

        [HttpPost("setBanGroup")]
        public ActionResult<IEnumerable<PermissionDetailDTO>> SetBanGroup(BanPermissionDTO banPermissionDTO)
        {
            int IdAdmin = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if(!_authorizeService.IsAdmin(IdAdmin))
                return BadRequest("Action only admin");
            
            var permissionDetail = _adminRepository.SetBanPermission(banPermissionDTO);
            if(permissionDetail == null)    return NotFound("Permission detail no exist");
            return Ok(permissionDetail);
        }

        [HttpGet("getPermissionDetailByCode/{Code}")]
        [AllowAnonymous]
        public ActionResult<PermissionDetailDTO> GetPermissionDetailByCode(string code)
        {
            var permissionDetail = _adminRepository.GetPermissionDetailByCode(code);
            if(permissionDetail == null)    return NotFound("Permission detail no exist");
            return Ok(permissionDetail);
        }
    }
}