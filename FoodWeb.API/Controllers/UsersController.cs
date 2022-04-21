using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using FoodWeb.API.Database;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;
using FoodWeb.API.Filter;
using FoodWeb.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodWeb.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IAuthorizeService _authorizeService;
        private readonly IFoodRepository _foodRepository;

        public UsersController(IUserRepository userRepository,
                               IAuthorizeService authorizeService,
                               IFoodRepository foodRepository)
        {
            this._foodRepository = foodRepository;
            this._userRepository = userRepository;
            this._authorizeService = authorizeService;
        }

        [HttpGet("GetProfileUser")]   //Lấy profile của user
        public ActionResult<ProfileDTO> GetProfileUser()
        {
            var Id = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (Id == null) return NotFound();
            var profile = _userRepository.GetProfileUserById(Int32.Parse(Id));
            if (profile == null) return NotFound();
            return Ok(profile);

        }

        [HttpPatch("EditProfile")]   //Chỉnh sửa profile của user  
        public ActionResult<ProfileDTO> EditUser(UserDTO userDTO)
        {
            var Id = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (Id == null) return NotFound();
            if(userDTO.NameUser != null && _userRepository.CheckExistUserName(userDTO.NameUser))
                return BadRequest("NameUser is existed!");

            _userRepository.UpdateProfile(Int32.Parse(Id), userDTO);
            return Ok(_userRepository.GetProfileUserById(Int32.Parse(Id)));
        }

        [HttpGet("getTotalPageAllSellers")] //Lấy tổng số trang của list seller
        [AllowAnonymous]
        public ActionResult<int> GetToTalPageAllSellers()
        {
            return Ok(_userRepository.GetTotalPageSellers());
        }

        [HttpGet("getAllSellers/page-{numberPage}")]    //Lấy tất cả các seller
        [AllowAnonymous]
        public ActionResult<IEnumerable<SellerViewDTO>> GetAllSellersPaging(int numberPage)
        {
            if(numberPage > _userRepository.GetTotalPageSellers())
                return NotFound("Page is not exist");

            return Ok(_userRepository.GetAllSellersPaging(numberPage));
        }

        [HttpGet("{Id}/foods/getTotalPageFoodByIdSeller")]  // Lấy tổng số trang food của 1 seller
        [AllowAnonymous]
        public ActionResult<int> GetTotalPageFoodByIdSeller(int Id, int numberPage)
        {
            return Ok(_foodRepository.GetToTalAllFoodsByIdSeller(Id));
        }

        [HttpGet("{Id}/foods/page-{numberPage}")]   //Lấy các food của 1 seller (có phân trang)
        [AllowAnonymous]
        public ActionResult<IEnumerable<FoodDTO>> GetFoodByIdSeller(int Id, int numberPage)
        {
            if (_userRepository.GetUserById(Id) == null || !_authorizeService.IsSeller(Id))
                return NotFound();

            if(numberPage > _foodRepository.GetToTalAllFoodsByIdSeller(Id))
                return NotFound("Page is not exist");

            return Ok(_foodRepository.GetAllFoodsByIdSellerPaging(Id, numberPage));
        }

        [HttpGet("getTotalPageSellerSearch")]   //Lấy tổng số trang các seller được search: keyname
        [AllowAnonymous]
        public ActionResult<int> GetTotalPageSeller(SearchDTO searchDTO)
        {
            return Ok(_userRepository.GetTotalPageSellersSearch(searchDTO));
        }

        [HttpGet("getAllSellerSearch/page-{numberPage}")]   //Lấy ra các seller được search: keyname
        [AllowAnonymous]
        public ActionResult<IEnumerable<SellerViewDTO>> GetAllSellerSearchPaging(int numberPage, SearchDTO searchDTO)
        {
            if(numberPage > _userRepository.GetTotalPageSellersSearch(searchDTO))
                return NotFound("Page is not exist");

            return Ok(_userRepository.GetAllSellersSearchPaging(numberPage, searchDTO));
        }

    }
}