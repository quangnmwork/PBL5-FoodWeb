using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.DTOs;

namespace FoodWeb.API.Database.IRepositories
{
    public interface IFoodRepository
    {
        public IEnumerable<FoodDTO> GetAllFoodsByIdSeller(int Id);

        public IEnumerable<FoodDTO> GetAllFoods();

        public IEnumerable<FoodDTO> GetAllFoodsBySearch(SearchDTO searchDTO);
    }
}