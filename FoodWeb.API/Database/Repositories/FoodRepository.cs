using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;
using FoodWeb.API.Extensions;
using PagedList;

namespace FoodWeb.API.Database.Repositories
{
    public class FoodRepository : IFoodRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public FoodRepository(DataContext context, IMapper mapper){
            this._context = context;
            this._mapper = mapper;
        }

        public FoodForSellerDTO CreateFood(int IdSeller, CreateFoodDTO createFoodDTO)
        {
            var food = _mapper.Map<Food>(createFoodDTO);
            var category = _context.Categorys.FirstOrDefault(u => u.IdCategory == createFoodDTO.CategoryId);

            food.UserId = IdSeller;
            food.TimeCreate = DateTime.Now;

            _context.Foods.Add(food);
            _context.SaveChanges();

            return _mapper.Map<Food, FoodForSellerDTO>(food);
        }

        public int GetTotalPageAllFoods()
        {
            int number = _context.Foods.Where(u => u.isHidden == false && u.isAdminHidden == false).Count();
            return (int)Math.Ceiling(1.0*number/PageServiceExtensions.FoodPageSize);
        }

        public IEnumerable<FoodDTO> GetAllFoodsPaging(int numberPage)
        {
            return _context.Foods.Where(u => u.isHidden == false && u.isAdminHidden == false)
                                 .ProjectTo<FoodDTO>(_mapper.ConfigurationProvider)
                                 .OrderBy(u => u.IdFood)
                                 .ToPagedList(numberPage, PageServiceExtensions.FoodPageSize);
        }

        public int GetToTalAllFoodsByIdSeller(int Id)
        {
            var number = _context.Foods.Where(s => s.UserId == Id && s.isHidden == false).Count();
            return (int)Math.Ceiling(1.0*number/PageServiceExtensions.FoodOfSellerPageSize);
        }

        public IEnumerable<FoodDTO> GetAllFoodsByIdSellerPaging(int Id, int numberPage)
        {
            return _context.Foods.Where(s => s.UserId == Id  && s.isHidden == false)
                                 .ProjectTo<FoodDTO>(_mapper.ConfigurationProvider)
                                 .OrderBy(u => u.IdFood)
                                 .ToPagedList(numberPage, PageServiceExtensions.FoodOfSellerPageSize);
        }

        public int GetTotalPageAllFoodsBySearch(SearchDTO searchDTO)
        {
            var numberFood = _context.Foods.Where(u => u.isHidden == false && u.isAdminHidden == false && u.NameFood.ToLower().Contains(searchDTO.KeyName.ToLower()))
                                           .ProjectTo<FoodDTO>(_mapper.ConfigurationProvider)
                                           .Where(u => u.NameCategory == searchDTO.NameCategory)
                                           .Count();

            return (int)Math.Ceiling(1.0*numberFood/PageServiceExtensions.FoodPageSize);
        }

        public IEnumerable<FoodDTO> GetAllFoodsBySearchPaging(int numberPage, SearchDTO searchDTO)
        {
            return _context.Foods.Where(u => u.isAdminHidden == false && u.isHidden == false && u.NameFood.ToLower().Contains(searchDTO.KeyName.ToLower()))
                                 .ProjectTo<FoodDTO>(_mapper.ConfigurationProvider)
                                 .Where(u => u.NameCategory == searchDTO.NameCategory)
                                 .OrderBy(u => u.IdFood)
                                 .ToPagedList(numberPage, PageServiceExtensions.FoodPageSize);
        }

        public FoodDTO GetFoodById(int Id)
        {
            return _context.Foods.Where(s => s.IdFood == Id && s.isHidden == false && s.isAdminHidden == false)
                                 .ProjectTo<FoodDTO>(_mapper.ConfigurationProvider)
                                 .FirstOrDefault();
        }

        public double PriceFoods(List<InfoFoodOrderDTO> ListInfoFood)
        {
            double money = 0;
            foreach(var item in ListInfoFood){
                var food = _context.Foods.FirstOrDefault(u => u.IdFood == item.IdFood);
                money += food.PriceFood*item.NumberFood;
            }

            return money;
        }

        public bool CheckGetFoodForSeller(int IdSeller, int IdFood)
        {
            var food = _context.Foods.FirstOrDefault(u => u.UserId == IdSeller && u.IdFood == IdFood);
            if(food == null)    return false;
            return true;
        }

        public FoodForSellerDTO GetFoodByIdForSeller(int IdFood)
        {
            return _context.Foods.Where(s => s.IdFood == IdFood)
                                 .ProjectTo<FoodForSellerDTO>(_mapper.ConfigurationProvider)
                                 .FirstOrDefault();
        }

        public int GetTotalPageFoodByIdSellerForSeller(int IdSeller)
        {
            int number = _context.Foods.Where(s => s.UserId == IdSeller).Count();
            return (int)Math.Ceiling(1.0*number/PageServiceExtensions.FoodOfSellerManagePageSize);
        }

        public IEnumerable<FoodForSellerDTO> GetAllFoodByIdSellerForSeller(int IdSeller)
        {
            return _context.Foods.Where(s => s.UserId == IdSeller)
                                 .ProjectTo<FoodForSellerDTO>(_mapper.ConfigurationProvider)
                                 .OrderBy(u => u.IdFood);
        }

        public FoodForSellerDTO SetHiddenFood(HiddenFoodDTO hiddenFoodDTO)
        {
            var food = _context.Foods.FirstOrDefault(u => u.IdFood == hiddenFoodDTO.IdFood);
            var category = _context.Categorys.FirstOrDefault(u => u.IdCategory == food.CategoryId);

            food.isHidden = hiddenFoodDTO.IsHidden;

            _context.SaveChanges();

            return _mapper.Map<FoodForSellerDTO>(food);
        }

        public void DeleteFood(int IdFood)
        {
            var food = _context.Foods.FirstOrDefault(u => u.IdFood == IdFood);
            _context.Foods.Remove(food);
            _context.SaveChanges();
        }

        public FoodForSellerDTO EditFood(int IdFood, EditFoodDTO editFoodDTO)
        {
            var food = _context.Foods.FirstOrDefault(u => u.IdFood == IdFood);
            _mapper.Map(editFoodDTO, food);
            _context.SaveChanges();
            
            var category = _context.Categorys.FirstOrDefault(u => u.IdCategory == food.CategoryId);
            return _mapper.Map<Food, FoodForSellerDTO>(food);
        }

        public bool CheckIsHidden(int IdFood)
        {
            var food = _context.Foods.FirstOrDefault(u => u.IdFood == IdFood);
            if(food == null)    return true;
            if(food.isHidden || food.isAdminHidden)
                return true;
            
            return false;
        }
    }
}