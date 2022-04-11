using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using AutoMapper;
using FoodWeb.API.Database;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;
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
        public UsersController(IUserRepository userRepository)
        {
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
        [HttpPatch("{Id}")]
        public ActionResult<User> EditUserById(CustomerDTO customerDto)
        {
            var Id = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (Id == null) return NotFound();
            _userRepository.UpdateProfile(Int32.Parse(Id),customerDto);
            if (_userRepository.SaveChanges()) return NoContent();
            return NotFound();
        }
    }
}