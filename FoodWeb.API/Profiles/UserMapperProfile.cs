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

            CreateMap<UserDTO, User>().ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<Category, CategoryDTO>();

            CreateMap<User, SellerViewDTO>();

            CreateMap<Food, FoodDTO>().ForMember(dest => dest.NameCategory, opt => opt.MapFrom(src => src.Category.NameCategory));

            CreateMap<Food, FoodForSellerDTO>().ForMember(dest => dest.NameCategory, opt => opt.MapFrom(src => src.Category.NameCategory));

            CreateMap<EditFoodDTO, Food>().ForAllMembers(
                opts => opts.Condition(
                    (src, dest, srcMember) => (
                        srcMember != null && 
                        (
                            Int32.TryParse(srcMember.ToString(), out _ ) == false || 
                            (
                                Int32.TryParse(srcMember.ToString(), out _ ) == true && 
                                Int32.Parse(srcMember.ToString())!= 0
                            ) 
                        )
                    )
                )
            );

            CreateMap<CreateFoodDTO, Food>();

            CreateMap<User, ProfileDTO>();

            CreateMap<OrderDetail, OrderDTO>().ForMember(dest => dest.IdRoom, opt => opt.MapFrom(src => src.Room.IdRoom))
                                              .ForMember(dest => dest.IdPayment, opt => opt.MapFrom(src => src.Payment.IdPayment))
                                              .ForMember(dest => dest.IdCustomer, opt => opt.MapFrom(src => src.Customer.IdUser))
                                              //.ForMember(dest => dest.IdShipper, opt => opt.MapFrom(src => src.Shipper.IdUser))
                                              .ForMember(dest => dest.IdShipper, opt => opt.MapFrom(src => src.ShipperId))
                                              .ForMember(dest => dest.NameCustomer, opt => opt.MapFrom(src => src.Customer.NameUser))
                                              .ForMember(dest => dest.NameShipper, opt => opt.MapFrom(src => src.Shipper.NameUser));

            CreateMap<ListOrder, InfoFoodOrderDTO>().ForMember(dest => dest.IdFood, opt => opt.MapFrom(src => src.FoodId))
                                                    .ForMember(dest => dest.NameFood, opt => opt.MapFrom(src => src.Food.NameFood))
                                                    .ForMember(dest => dest.ImageFood, opt => opt.MapFrom(src => src.Food.ImageFood))
                                                    .ForMember(dest => dest.NumberFood, opt => opt.MapFrom(src => src.Number));
            
            CreateMap<ListOrder, InfoFoodAndSellerOrderDTO>().ForMember(dest => dest.IdFood, opt => opt.MapFrom(src => src.FoodId))
                                                             .ForMember(dest => dest.NameFood, opt => opt.MapFrom(src => src.Food.NameFood))
                                                             .ForMember(dest => dest.ImageFood, opt => opt.MapFrom(src => src.Food.ImageFood))
                                                             .ForMember(dest => dest.NumberFood, opt => opt.MapFrom(src => src.Number))
                                                             .ForMember(dest => dest.SellerId, opt => opt.MapFrom(src => src.Food.User.IdUser))
                                                             .ForMember(dest => dest.NameSeller, opt => opt.MapFrom(src => src.Food.User.NameUser))
                                                             .ForMember(dest => dest.Avatar, opt => opt.MapFrom(src => src.Food.User.Avatar))
                                                             .ForMember(dest => dest.PriceFood, opt => opt.MapFrom(src => src.Food.PriceFood));

            CreateMap<Payment, PaymentDTO>();

            CreateMap<GroupDetail, GroupDetailDTO>().ForMember(dest => dest.IdAccount, opt => opt.MapFrom(src => src.AccountId));

            CreateMap<BanUserDTO, GroupDetail>().ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && 
                        (
                            DateTime.TryParse(srcMember.ToString(), out _ ) == false || 
                            (
                                DateTime.TryParse(srcMember.ToString(), out _ ) == true && 
                                DateTime.Parse(srcMember.ToString()).ToString("yyyy-MM-ddTHH:mm:ss") != "0001-01-01T00:00:00"
                            ) 
                        )));

            CreateMap<PermissionDetail, PermissionDetailDTO>().ForMember(dest => dest.NameGroup, opt => opt.MapFrom(src => src.Group.NameGroup))
                                                              .ForMember(dest => dest.NamePermission, opt => opt.MapFrom(src => src.Permission.NamePermission));
        }
    }
}