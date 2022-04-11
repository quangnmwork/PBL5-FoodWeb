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
using Microsoft.Extensions.Configuration;

namespace Namespace
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class TestController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IAuthorizeService _authorizeService;

        public TestController(IUserRepository userRepository, 
                              IMapper mapper, 
                              IConfiguration configuration,
                              IAuthorizeService authorizeService)
        {
            this._configuration = configuration;
            this._authorizeService = authorizeService;
            this._mapper = mapper;
            this._userRepository = userRepository;
        }

        [HttpGet("getAllUsers")]
        public ActionResult<IEnumerable<User>> GetListUsers()
        {
            return Ok(_userRepository.GetAllUsers());
        }

        [HttpGet("getUser/{Id}")]
        public ActionResult<User> GetUserById(int Id)
        {
            var user = _userRepository.GetUserById(Id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpGet("getCustomer/{Id}")]
        public ActionResult<CustomerDTO> GetCustomerById(int Id)
        {
            var user = _userRepository.GetUserById(Id);
            if (user == null) return NotFound();
            return Ok(_mapper.Map<CustomerDTO>(user));
        }

        [HttpGet("getClaim")]
        public ActionResult<string> GetClaim()
        {
            var strId = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;

            //IEnumerable<Claim> username1 = this.User.FindAll(ClaimTypes.A);

            if (string.IsNullOrEmpty(strId))
            {
                return NotFound();
            }
            return strId;
        }

        [HttpGet("authorization")]
        public ActionResult<string> testAuthorize()
        {
            var strId = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if(_authorizeService.IsSeller(Int32.Parse(strId))) return Content("ok");
            return BadRequest("nooooo");

            //IEnumerable<Claim> username1 = this.User.FindAll(ClaimTypes.A);

            // if (string.IsNullOrEmpty(username))
            // {
            //     return NotFound();
            // }
            // return username;
        }
    }
}