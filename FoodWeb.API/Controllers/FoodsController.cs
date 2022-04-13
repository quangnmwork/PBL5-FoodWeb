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

        [HttpGet("getAllFoods")]
        public ActionResult<IEnumerable<FoodDTO>> GetAllFoods()
        {
            return Ok(_foodRepository.GetAllFoods());
        }

        [HttpGet("{Id}")]
        public ActionResult<FoodDTO> GetFoodById(int Id)
        {
            var food = _foodRepository.GetFoodById(Id);
            if(food == null)    return NotFound();
            return Ok(food);
        }
        
        [HttpGet("search")]
        public ActionResult<IEnumerable<FoodDTO>> GetAllFoodsBySearch(SearchDTO search)
        {
            var data = _foodRepository.GetAllFoodsBySearch(search);
            if(data == null)    return NotFound();
            return Ok(_foodRepository.GetAllFoodsBySearch(search));
        }
    }
}