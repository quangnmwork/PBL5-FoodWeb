using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.DTOs;

namespace FoodWeb.API.Profiles
{
    public class UserMapperProfile : Profile
    {
        public UserMapperProfile()
        {
            CreateMap<User, CustomerDTO>();

            CreateMap<CustomerDTO, User>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<Category, CategoryDTO>();

            CreateMap<User, SellerDTO>();

            CreateMap<Food, FoodDTO>().ForMember(dest => dest.NameCategory, opt => opt.MapFrom(src => src.Category.NameCategory));
        }
    }
}