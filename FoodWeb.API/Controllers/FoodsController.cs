using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper.Internal;
using AutoMapper.Internal.Mappers;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;
using FoodWeb.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodWeb.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FoodsController : ControllerBase
    {
        private readonly IFoodRepository _foodRepository;
        private readonly IAuthorizeService _authorizeService;
        private readonly ICloudinaryService _cloudinary;

        public FoodsController(IFoodRepository foodRepository,
                               IAuthorizeService authorizeService,
                               ICloudinaryService cloudinary)
        {
            this._foodRepository = foodRepository;
            this._authorizeService = authorizeService;
            this._cloudinary = cloudinary;
        }

        [HttpPost("createFood")]
        [Authorize]
        public ActionResult<FoodForSellerDTO> CreateFood(IFormFileCollection formFiles) // seller thêm mới một món ăn
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsSeller(Id))
                return BadRequest("Action only seller");
            var createFoodDTO = new CreateFoodDTO(){
                NameFood = HttpContext.Request.Form["NameFood"],
                PriceFood = Double.Parse(HttpContext.Request.Form["PriceFood"]),
                isHidden = Boolean.Parse(HttpContext.Request.Form["isHidden"]),
                DescriptionFood = HttpContext.Request.Form["DescriptionFood"],
                CategoryId = Int32.Parse(HttpContext.Request.Form["CategoryId"]),
            };
            var imageFoodFile = HttpContext.Request.Form.Files.GetFile("ImageFood");
            if (imageFoodFile!=null){
                // Console.WriteLine("Lenght " +imageFoodFile.Length);
                createFoodDTO.ImageFood = _cloudinary.UploadImage("Foods",imageFoodFile);
                // Console.WriteLine("Link " +createFoodDTO.ImageFood);
            }
            var food = _foodRepository.CreateFood(Id, createFoodDTO);

            return Ok(food);
        }

        [HttpGet("getAllFoods/page-{numberPage}")]  //Lấy tất cả các food có trong csdl (phân trang) dành cho viewer
        public ActionResult<IEnumerable<FoodDTO>> GetAllFoods(int numberPage)
        {
            if(numberPage > _foodRepository.GetTotalPageAllFoods())
                return NotFound("Page is not exist");

            return Ok(_foodRepository.GetAllFoodsPaging(numberPage));
        }

        [HttpGet("getTotalPageAllFoods")]   // Lấy tổng số trang của tất cả các food dành cho viewer
        public ActionResult<int> GetTotalPageAllFoods()
        {
            return Ok(_foodRepository.GetTotalPageAllFoods());
        }

        [HttpGet("{Id}")]   // Lấy food theo IdFood dành cho vierwer, customer, shipper
        public ActionResult<FoodDTO> GetFoodById(int Id)
        {
            var food = _foodRepository.GetFoodById(Id);
            if (food == null) return NotFound("This Food is not found or seller is hidden");
            return Ok(food);
        }

        [HttpGet("forSeller/{IdFood}")]   // Lấy food theo IdFood dành cho seller
        [Authorize]
        public ActionResult<FoodForSellerDTO> GetFoodByIdForSeller(int IdFood)
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsSeller(Id)){
                return BadRequest("Action only seller");
            }

            if(!_foodRepository.CheckGetFoodForSeller(Id, IdFood)){
                return BadRequest("You have not permission");
            }

            return Ok(_foodRepository.GetFoodByIdForSeller(IdFood));
        }

        [HttpGet("search/page-{numberPage}")]   // lấy các food được search: category, keyname (phân trang)
        public ActionResult<IEnumerable<FoodDTO>> GetAllFoodsBySearch(int numberPage)
        {
            SearchDTO searchDTO = new SearchDTO{
                NameCategory = HttpContext.Request.Query["nameCategory"],
                KeyName = HttpContext.Request.Query["keyName"]
            };

            string nameCategory = HttpContext.Request.Query["nameCategory"];
            string keyName = HttpContext.Request.Query["keyName"];
            if(numberPage > _foodRepository.GetTotalPageAllFoodsBySearch(searchDTO))
                return NotFound("Page is not exist");

            var data = _foodRepository.GetAllFoodsBySearchPaging(numberPage, searchDTO);
            if (data == null) return NotFound();
            return Ok(data);
        }

        [HttpGet("getTotalPageAllFoodsBySearch")]   // lấy tổng số trang food được search : category, keyname
        public ActionResult<int> GetTotalPageAllFoodsBySearch()
        {
            SearchDTO searchDTO = new SearchDTO{
                NameCategory = HttpContext.Request.Query["nameCategory"],
                KeyName = HttpContext.Request.Query["keyName"]
            };

            return Ok(_foodRepository.GetTotalPageAllFoodsBySearch(searchDTO));
        }

        [HttpGet("getTotalPageListFoodOfSeller")]  // Lấy các food của 1 seller (có phân trang) dành cho seller
        public ActionResult<int> GetTotalPageListFoodOfSeller()
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsSeller(Id)){
                return BadRequest("Action only seller");
            }

            return Ok(_foodRepository.GetTotalPageFoodByIdSellerForSeller(Id));
        }

        [HttpGet("getListFood/page-{numberPage}")]  // Lấy các food của 1 seller (có phân trang) dành cho seller
        public ActionResult<IEnumerable<FoodForSellerDTO>> GetListFoodOfSeller(int numberPage)
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsSeller(Id)){
                return BadRequest("Action only seller");
            }

            return Ok(_foodRepository.GetAllFoodByIdSellerForSellerPaging(Id, numberPage));
        }
        
        [HttpPost("setHiddenFood")]     // Seller set ẩn hiện các món ăn
        [Authorize]
        public ActionResult<FoodForSellerDTO> SetHiddenFood(HiddenFoodDTO hiddenFoodDTO)
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsSeller(Id))
                return BadRequest("Action only seller");
            
            if(!_foodRepository.CheckGetFoodForSeller(Id, hiddenFoodDTO.IdFood))
                return Unauthorized("You have not permission");

            var food = _foodRepository.SetHiddenFood(hiddenFoodDTO);

            return food;
        }

        [HttpDelete("DeleteFood/{IdFood}")]
        [Authorize]
        public ActionResult<string> DeleteFood(int IdFood)
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsSeller(Id))
                return BadRequest("Action only seller");
            
            if(!_foodRepository.CheckGetFoodForSeller(Id, IdFood))
                return Unauthorized("You have not permission");

            _foodRepository.DeleteFood(IdFood);
            return Ok("Delete Success");
        }

        [HttpPatch("editFood/{IdFood}")]
        [Authorize]
        public ActionResult<FoodForSellerDTO> EditFood(int IdFood ,IFormFileCollection formFiles)
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsSeller(Id))
                return BadRequest("Action only seller");
            
            if(!_foodRepository.CheckGetFoodForSeller(Id, IdFood))
                return Unauthorized("You have not permission");
            var editFoodDTO = new EditFoodDTO();
            foreach (var i in HttpContext.Request.Form){
                // Console.WriteLine(i);
                var type = editFoodDTO.GetType().GetProperty(i.Key);
                // Console.WriteLine(type.PropertyType);
                type.SetMemberValue(editFoodDTO,Convert.ChangeType(i.Value.ToString(), type.PropertyType));
            }
            var avatarFile = HttpContext.Request.Form.Files.GetFile("ImageFood");
            if (avatarFile!=null){
                // Console.WriteLine("Lenght " +avatarFile.Length);
                editFoodDTO.ImageFood = _cloudinary.UploadImage("Users",avatarFile);
                // Console.WriteLine("Link " +editFoodDTO.ImageFood);
            }
            var food = _foodRepository.EditFood(IdFood, editFoodDTO);

            return Ok(food);
        }
    }
}