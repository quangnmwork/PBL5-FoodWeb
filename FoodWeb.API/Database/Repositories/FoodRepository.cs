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

        // public IEnumerable<FoodDTO> GetAllFoods()
        // {
        //     return _context.Foods.ProjectTo<FoodDTO>(_mapper.ConfigurationProvider);
        // }

        public int GetTotalPageAllFoods()
        {
            return (int)Math.Ceiling(1.0*_context.Foods.Count()/PageServiceExtensions.FoodPageSize);
        }

        public IEnumerable<FoodDTO> GetAllFoodsPaging(int numberPage)
        {
            return _context.Foods.ProjectTo<FoodDTO>(_mapper.ConfigurationProvider)
                                 .OrderBy(u => u.IdFood)
                                 .ToPagedList(numberPage, PageServiceExtensions.FoodPageSize);
        }

        public int GetToTalAllFoodsByIdSeller(int Id)
        {
            var number = _context.Foods.Where(s => s.UserId == Id).Count();
            return (int)Math.Ceiling(1.0*number/PageServiceExtensions.FoodOfSellerPageSize);
        }

        public IEnumerable<FoodDTO> GetAllFoodsByIdSellerPaging(int Id, int numberPage)
        {
            return _context.Foods.Where(s => s.UserId == Id)
                                 .ProjectTo<FoodDTO>(_mapper.ConfigurationProvider)
                                 .OrderBy(u => u.IdFood)
                                 .ToPagedList(numberPage, PageServiceExtensions.FoodOfSellerPageSize);
        }

        // public IEnumerable<FoodDTO> GetAllFoodsBySearch(SearchDTO searchDTO)
        // {
        //     List<FoodDTO> data = new List<FoodDTO>();
        //     foreach(var food in GetAllFoods()){
        //         if(food.NameCategory == searchDTO.NameCategory && food.NameFood.Contains(searchDTO.KeyName)){
        //             data.Add(_mapper.Map<FoodDTO>(food));
        //         }
        //     }

        //     return data;
        // }

        public IEnumerable<FoodDTO> GetAllFoodsBySearchPaging(int numberPage, SearchDTO searchDTO)
        {
            return _context.Foods.ProjectTo<FoodDTO>(_mapper.ConfigurationProvider)
                                 .Where(u => u.NameCategory == searchDTO.NameCategory && u.NameFood.Contains(searchDTO.KeyName))
                                 .OrderBy(u => u.IdFood)
                                 .ToPagedList(numberPage, PageServiceExtensions.FoodPageSize);
        }

        public FoodDTO GetFoodById(int Id)
        {
            return _context.Foods.Where(s => s.IdFood == Id).ProjectTo<FoodDTO>(_mapper.ConfigurationProvider).FirstOrDefault();
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

        public int GetTotalPageAllFoodsBySearch(SearchDTO searchDTO)
        {
            var numberFood = _context.Foods.ProjectTo<FoodDTO>(_mapper.ConfigurationProvider)
                                           .Where(u => u.NameCategory == searchDTO.NameCategory && u.NameFood.Contains(searchDTO.KeyName))
                                           .Count();

            return (int)Math.Ceiling(1.0*numberFood/PageServiceExtensions.FoodPageSize);
        }

        
    }
}