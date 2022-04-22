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
    public class FoodsController : ControllerBase
    {
        private readonly IFoodRepository _foodRepository;
        private readonly IAuthorizeService _authorizeService;

        public FoodsController(IFoodRepository foodRepository,
                               IAuthorizeService authorizeService)
        {
            this._foodRepository = foodRepository;
            this._authorizeService = authorizeService;
        }

        [HttpPost("createFood")]
        [Authorize]
        public ActionResult<FoodForSellerDTO> CreateFood(CreateFoodDTO createFoodDTO) // seller thêm mới một món ăn
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsSeller(Id))
                return BadRequest("Action only seller");

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
        public ActionResult<IEnumerable<FoodDTO>> GetAllFoodsBySearch(int numberPage, SearchDTO search)
        {
            if(numberPage > _foodRepository.GetTotalPageAllFoodsBySearch(search))
                return NotFound("Page is not exist");

            var data = _foodRepository.GetAllFoodsBySearchPaging(numberPage, search);
            if (data == null) return NotFound();
            return Ok(data);
        }

        [HttpGet("getTotalPageAllFoodsBySearch")]   // lấy tổng số trang food được search : category, keyname
        public ActionResult<int> GetTotalPageAllFoodsBySearch(SearchDTO search)
        {
            return Ok(_foodRepository.GetTotalPageAllFoodsBySearch(search));
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
        public ActionResult<FoodForSellerDTO> EditFood(int IdFood, EditFoodDTO editFoodDTO)
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(!_authorizeService.IsSeller(Id))
                return BadRequest("Action only seller");
            
            if(!_foodRepository.CheckGetFoodForSeller(Id, IdFood))
                return Unauthorized("You have not permission");
            
            var food = _foodRepository.EditFood(IdFood, editFoodDTO);

            return Ok(food);
        }
    }
}