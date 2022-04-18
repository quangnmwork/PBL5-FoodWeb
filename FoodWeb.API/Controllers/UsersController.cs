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

        [HttpGet("GetProfileUser")]
        public ActionResult<ProfileDTO> GetProfileUser()
        {
            var Id = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (Id == null) return NotFound();
            var profile = _userRepository.GetProfileUserById(Int32.Parse(Id));
            if (profile == null) return NotFound();
            return Ok(profile);

        }

        [HttpPatch("EditProfile")]
        public ActionResult<ProfileDTO> EditUser(UserDTO userDTO)
        {
            var Id = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (Id == null) return NotFound();
            if(userDTO.NameUser != null && _userRepository.CheckExistUserName(userDTO.NameUser))
                return BadRequest("NameUser is existed!");

            _userRepository.UpdateProfile(Int32.Parse(Id), userDTO);
            return Ok(_userRepository.GetProfileUserById(Int32.Parse(Id)));
        }

        [HttpGet("getAllSellers")]
        [AllowAnonymous]
        public ActionResult<IEnumerable<SellerDTO>> GetAllSellers()
        {
            return Ok(_userRepository.GetAllSellers());
        }

        [HttpGet("{Id}/foods")]
        [AllowAnonymous]
        public ActionResult<IEnumerable<FoodDTO>> GetFoodByIdSeller(int Id)
        {
            if (_userRepository.GetUserById(Id) == null || !_authorizeService.IsSeller(Id))
                return NotFound();

            return Ok(_foodRepository.GetAllFoodsByIdSeller(Id));
        }
    }
}