using System;
using System.Security.Claims;
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
    public class RoomDetailController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoomDetailRepository _roomDetailRepository;
        public RoomDetailController(
            IUserRepository userRepository,
            IRoomDetailRepository roomDetailRepository
        )
        {
            this._userRepository = userRepository;
            this._roomDetailRepository = roomDetailRepository;
        }
        [HttpGet]
        public ActionResult<RoomDetail> GetAllRoomDetail()
        {
            return Ok(_roomDetailRepository.GetAllRoomDetail());
        }
        [HttpGet("{Id}")]
        public ActionResult<RoomDetail> GetRoomDetailByRoomId(int Id)
        {
            return Ok(_roomDetailRepository.GetRoomDetailByRoomId(Id));
        }
    }
}