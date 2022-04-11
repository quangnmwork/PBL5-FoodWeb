using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;

namespace FoodWeb.API.Database.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DataContext _context;
        public CategoryRepository(DataContext context)
        {
            this._context = context;

        }
        public IEnumerable<Category> GetAllCategories()
        {
            return _context.Categorys;
        }
    }
}