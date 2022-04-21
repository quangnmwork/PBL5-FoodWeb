using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace FoodWeb.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FoodsController : ControllerBase
    {
        private readonly IFoodRepository _foodRepository;

        public FoodsController(IFoodRepository foodRepository)
        {
            this._foodRepository = foodRepository;

        }

        [HttpGet("getAllFoods/page-{numberPage}")]  //Lấy tất cả các food có trong csdl (phân trang)
        public ActionResult<IEnumerable<FoodDTO>> GetAllFoods(int numberPage)
        {
            if(numberPage > _foodRepository.GetTotalPageAllFoods())
                return NotFound("Page is not exist");

            return Ok(_foodRepository.GetAllFoodsPaging(numberPage));
        }

        [HttpGet("getTotalPageAllFoods")]   // Lấy tổng số trang của tất cả các food
        public ActionResult<int> GetTotalPageAllFoods()
        {
            return Ok(_foodRepository.GetTotalPageAllFoods());
        }

        [HttpGet("{Id}")]   // Lấy food theo IdFood
        public ActionResult<FoodDTO> GetFoodById(int Id)
        {
            var food = _foodRepository.GetFoodById(Id);
            if (food == null) return NotFound();
            return Ok(food);
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
    }
}