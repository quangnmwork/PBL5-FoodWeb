using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodWeb.API.Database;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.Database.Repositories;
using FoodWeb.API.Profiles;
using FoodWeb.API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FoodWeb.API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration){
            services.AddDbContext<DataContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            services.AddAutoMapper(typeof(UserMapperProfile).Assembly);
            
            //services.AddHttpContextAccessor();
            //configuration.Filters.
            
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IAuthorizeService, AuthorizeService>();

            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IGroupDetailRepository, GroupDetailRepository>();
            services.AddScoped<IGroupRepository, GroupRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IFoodRepository, FoodRepository>();
            services.AddScoped<IRoomRepository, RoomRepository>();
            services.AddScoped<IOrderDetailRepository, OrderDetailRepository>();
            services.AddScoped<IPaymentRepository, PaymentRepository>();
            services.AddScoped<IListOrderRepository, ListOrderRepository>();
            services.AddScoped<IRoomDetailRepository, RoomDetailRepository>();

            return services;
        }
    }
}