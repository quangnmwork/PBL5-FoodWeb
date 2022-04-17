using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Namespace
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

        [HttpGet("getAllFoods/page-{numberPage}")]
        public ActionResult<IEnumerable<FoodDTO>> GetAllFoods(int numberPage)
        {
            return Ok(_foodRepository.GetAllFoodsPaging(numberPage));
        }

        [HttpGet("{Id}")]
        public ActionResult<FoodDTO> GetFoodById(int Id)
        {
            var food = _foodRepository.GetFoodById(Id);
            if (food == null) return NotFound();
            return Ok(food);
        }

        [HttpGet("search/page-{numberPage}")]
        public ActionResult<IEnumerable<FoodDTO>> GetAllFoodsBySearch(int numberPage, SearchDTO search)
        {
            var data = _foodRepository.GetAllFoodsBySearchPaging(numberPage, search);
            if (data == null) return NotFound();
            return Ok(data);
        }
    }
}