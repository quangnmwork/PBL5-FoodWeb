using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;
using FoodWeb.API.Filter;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Namespace
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
            return Ok(_categoryRepository.GetAllCategories());
        }
    }
}