using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mime;
using System.Security.Claims;
using AutoMapper.Internal;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using FoodWeb.API.Database;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;
using FoodWeb.API.Filter;
using FoodWeb.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

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
        private readonly IConfiguration _config;
        private readonly Cloudinary _cloudinary;

        public UsersController(IUserRepository userRepository,
                               IAuthorizeService authorizeService,
                               IFoodRepository foodRepository,
                               IConfiguration config)
        {
            this._foodRepository = foodRepository;
            this._userRepository = userRepository;
            this._authorizeService = authorizeService;
            Console.WriteLine(config.GetValue<String>("CLOUD_NAME") + config.GetValue<String>("API_KEY"));
            CloudinaryDotNet.Account account = new CloudinaryDotNet.Account(
                config.GetValue<String>("CLOUD_NAME"),
                config.GetValue<String>("API_KEY"),
                config.GetValue<String>("API_SECRET")
            );
            this._cloudinary = new Cloudinary(account);
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
        public ActionResult<ProfileDTO> EditUser(IFormFileCollection formFiles)
        {
            var userDTO = new UserDTO();
            foreach (var i in HttpContext.Request.Form){
                Console.WriteLine(i);
                Console.WriteLine(userDTO.GetType().GetProperty(i.Key));
                userDTO.GetType().GetProperty(i.Key).SetValue(userDTO,i.Value.ToString());
            }
            Console.WriteLine(userDTO.ToString());
            

            var Id = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (Id == null) return NotFound();

            if(userDTO.NameUser != null && _userRepository.CheckExistUserName(userDTO.NameUser))
                return BadRequest("NameUser is existed!");

            var avatarFile = HttpContext.Request.Form.Files.GetFile("Avatar");
            if (avatarFile!=null){
                Console.WriteLine("Lenght " +avatarFile.Length);
                userDTO.Avatar = UploadImage(avatarFile);
                Console.WriteLine("Link " +userDTO.Avatar);
            }
            _userRepository.UpdateProfile(Int32.Parse(Id), userDTO);
            return Ok(_userRepository.GetProfileUserById(Int32.Parse(Id)));
        }
        public String UploadImage(IFormFile avatarFile)
        {
            var ms = new MemoryStream();
            avatarFile.CopyTo(ms);
            var fileBytes = ms.ToArray();
            ms = new MemoryStream(fileBytes, 0, fileBytes.Length);

            ImageUploadParams uploadParams = new ImageUploadParams()
            {
                File = new FileDescription("file", ms),
                PublicId = "Users/" + avatarFile.FileName + DateTime.Now
            };

            ImageUploadResult result = _cloudinary.Upload(uploadParams);
            return _cloudinary.Api.UrlImgUp.BuildUrl(String.Format("{0}.{1}", result.PublicId, result.Format));
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

        [HttpGet("{Id}/foods/page-{numberPage}")]   //Lấy các food của 1 seller (có phân trang) dành cho các viewer, customer, shipper
        [AllowAnonymous]
        public ActionResult<IEnumerable<FoodDTO>> GetFoodByIdSeller(int Id, int numberPage)
        {
            if (_userRepository.GetUserById(Id) == null || !_authorizeService.IsSeller(Id))
                return NotFound();

            if(numberPage > _foodRepository.GetToTalAllFoodsByIdSeller(Id))
                return NotFound("Page is not exist");

            return Ok(_foodRepository.GetAllFoodsByIdSellerPaging(Id, numberPage));
        }

        [HttpGet("getTotalPageSellerSearch")]   //Lấy tổng số trang các seller được search: keyname dành cho các viewer, customer, shipper
        [AllowAnonymous]
        public ActionResult<int> GetTotalPageSellerSearch()
        {
            SearchDTO searchDTO = new SearchDTO{
                KeyName = HttpContext.Request.Query["keyName"]
            };

            return Ok(_userRepository.GetTotalPageSellersSearch(searchDTO));
        }

        [HttpGet("getAllSellerSearch/page-{numberPage}")]   //Lấy ra các seller được search: keyname
        [AllowAnonymous]
        public ActionResult<IEnumerable<SellerViewDTO>> GetAllSellerSearchPaging(int numberPage)
        {
            SearchDTO searchDTO = new SearchDTO{
                KeyName = HttpContext.Request.Query["keyName"]
            };
            
            if(numberPage > _userRepository.GetTotalPageSellersSearch(searchDTO))
                return NotFound("Page is not exist");

            return Ok(_userRepository.GetAllSellersSearchPaging(numberPage, searchDTO));
        }

        
    }
}