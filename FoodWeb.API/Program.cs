using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodWeb.API.Database;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using PBL5.FoodWeb.API.Database.SeedData;

namespace FoodWeb.API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using var scope = host.Services.CreateScope();
            var serviceProvider = scope.ServiceProvider;

            var context = serviceProvider.GetRequiredService<DataContext>();
            var seed = new Seed(context);
            seed.SeedGroups();
            seed.SeedPermissions();
            seed.SeedPermissionDetails();
            await seed.SeedCategories();
            await seed.SeedUsers();
            await seed.SeedFoods();

            // seed.SeedCategories();
            // seed.SeedUsers();
            // seed.SeedFoods();
            //Console.WriteLine(DateTime.Now.ToString("dd/MM/yyyy-HH:mm:ss,fff"));
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
