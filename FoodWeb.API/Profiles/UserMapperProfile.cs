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
                                              .ForMember(dest => dest.IdPayment, opt => opt.MapFrom(src => src.Payment.IdPayment))
                                              .ForMember(dest => dest.IdCustomer, opt => opt.MapFrom(src => src.Customer.IdUser))
                                              //.ForMember(dest => dest.IdShipper, opt => opt.MapFrom(src => src.Shipper.IdUser))
                                              .ForMember(dest => dest.IdShipper, opt => opt.MapFrom(src => src.ShipperId));

            CreateMap<ListOrder, InfoFoodOrderDTO>().ForMember(dest => dest.IdFood, opt => opt.MapFrom(src => src.FoodId))
                                                    .ForMember(dest => dest.NameFood, opt => opt.MapFrom(src => src.Food.NameFood))
                                                    .ForMember(dest => dest.NumberFood, opt => opt.MapFrom(src => src.Number));

            CreateMap<Payment, PaymentDTO>();
        }
    }
}