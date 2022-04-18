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
            CreateMap<User, UserDTO>();

            CreateMap<UserDTO, User>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<Category, CategoryDTO>();

            CreateMap<User, SellerDTO>();

            CreateMap<Food, FoodDTO>().ForMember(dest => dest.NameCategory, opt => opt.MapFrom(src => src.Category.NameCategory));

            CreateMap<User, ProfileDTO>();

            CreateMap<OrderDetail, OrderDTO>().ForMember(dest => dest.IdRoom, opt => opt.MapFrom(src => src.Room.IdRoom))
                                              .ForMember(dest => dest.IdPayment, opt => opt.MapFrom(src => src.Payment.IdPayment));
        }
    }
}