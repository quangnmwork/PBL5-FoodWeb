using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;
using FoodWeb.API.Filter;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodWeb.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        public IServiceProvider _serviceProvider { get; }

        public CategoriesController(ICategoryRepository categoryRepository, IServiceProvider serviceProvider)
        {
            this._serviceProvider = serviceProvider;
            this._categoryRepository = categoryRepository;
        }

        [HttpGet("getAllCategories")]
        public ActionResult<IEnumerable<CategoryDTO>> GetAllCategories()
        {
            // string page = HttpContext.Request.Query["page"];
            return Ok(_categoryRepository.GetAllCategories());
        }
    }
}