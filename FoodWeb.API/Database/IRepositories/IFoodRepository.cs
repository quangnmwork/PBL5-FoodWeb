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
        public FoodForSellerDTO CreateFood(int IdSeller, CreateFoodDTO createFoodDTO);

        public int GetToTalAllFoodsByIdSeller(int Id);

        public IEnumerable<FoodDTO> GetAllFoodsByIdSellerPaging(int Id, int numberPage);

        //public IEnumerable<FoodDTO> GetAllFoods();

        public int GetTotalPageAllFoods();

        public IEnumerable<FoodDTO> GetAllFoodsPaging(int numberPage);

        public FoodDTO GetFoodById(int Id);

        //public IEnumerable<FoodDTO> GetAllFoodsBySearch(SearchDTO searchDTO);

        public double PriceFoods(List<InfoFoodOrderDTO> ListInfoFood);

        public int GetTotalPageAllFoodsBySearch(SearchDTO searchDTO);

        public IEnumerable<FoodDTO> GetAllFoodsBySearchPaging(int numberPage, SearchDTO searchDTO);

        public bool CheckGetFoodForSeller(int IdSeller, int IdFood);

        public FoodForSellerDTO GetFoodByIdForSeller(int IdFood);

        public int GetTotalPageFoodByIdSellerForSeller(int IdSeller);
        
        public IEnumerable<FoodForSellerDTO> GetAllFoodByIdSellerForSellerPaging(int IdSeller, int numberPage);

        public FoodForSellerDTO SetHiddenFood(HiddenFoodDTO hiddenFoodDTO);

        public void DeleteFood(int IdFood);

        public FoodForSellerDTO EditFood(int IdFood, EditFoodDTO editFoodDTO);

        public bool CheckIsHidden(int IdFood);
    }
}