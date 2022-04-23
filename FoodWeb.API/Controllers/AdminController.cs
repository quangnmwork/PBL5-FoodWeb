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
    }
}