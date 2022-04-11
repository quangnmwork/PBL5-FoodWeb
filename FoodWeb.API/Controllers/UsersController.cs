using System.Collections.Generic;
using System.Linq;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using FoodWeb.API.Database.IRepositories;
using AutoMapper;
using FoodWeb.API.DTOs;

namespace FoodWeb.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            this._mapper = mapper;
            this._userRepository = userRepository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<User>> GetListUsers()
        {
            return Ok(_userRepository.GetAllUsers());
        }

        [HttpGet("{Id}")]
        public ActionResult<User> GetUserById(int Id)
        {
            var user = _userRepository.GetUserById(Id);
            if (user == null) return NotFound();
            return Ok(user);
        }
    }
}