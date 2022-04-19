using System.ComponentModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using FoodWeb.API.Database;
using FoodWeb.API.Database.Entities;

namespace PBL5.FoodWeb.API.Database.SeedData
{
    public class Seed
    {
        private readonly DataContext context;
        public Seed(DataContext context)
        {
            this.context = context;
        }

        public void SeedGroups()
        {
            if (context.Groups.Any())
            {
                // foreach (var item in context.Groups)
                //     context.Groups.Remove(item);
                // context.SaveChanges();
                return;
            }

            var jsonData = File.ReadAllText("Database/SeedData/GroupData.json");
            var groupsData = JsonSerializer.Deserialize<List<Group>>(jsonData);
            if (groupsData == null) return;

            foreach (var item in groupsData)
            {
                context.Groups.Add(item);
            }
            context.SaveChanges();
        }

        public void SeedPermissions()
        {
            if (context.Permissions.Any())
            {
                // foreach (var item in context.Permissions)
                //     context.Permissions.Remove(item);
                // context.SaveChanges();
                return;
            }

            var jsonData = File.ReadAllText("Database/SeedData/PermissionData.json");
            var permissionsData = JsonSerializer.Deserialize<List<Permission>>(jsonData);
            if (permissionsData == null) return;

            foreach (var item in permissionsData)
            {
                context.Permissions.Add(item);
            }
            context.SaveChanges();
        }

        public void SeedPermissionDetails()
        {
            if (context.PermissionDetails.Any())
            {
                return;
            }
            // else{
            //     context.SaveChanges();
            // }

            var jsonData = File.ReadAllText("Database/SeedData/PermissionDetailData.json");
            var permissionDetailsData = JsonSerializer.Deserialize<List<PermissionDetail>>(jsonData);
            if (permissionDetailsData == null) return;

            foreach (var item in permissionDetailsData)
            {
                context.PermissionDetails.Add(item);
            }
            context.SaveChanges();
        }

        public async Task<bool> SeedCategories()
        {
            if (context.Categorys.Any())
            {
                return false;
            }

            var jsonData = File.ReadAllText("Database/SeedData/CategoryData.json", Encoding.UTF8);
            var categoriesData = JsonSerializer.Deserialize<List<Category>>(jsonData);
            if (categoriesData == null) return false;

            foreach (var item in categoriesData)
            {
                context.Categorys.Add(item);
                await context.SaveChangesAsync();
            }
            // context.SaveChanges();
            return true;
        }

        public async Task<bool> SeedUsersDetail(String path){
            var jsonData = File.ReadAllText(path, Encoding.UTF8);
            var options = new JsonSerializerOptions()
            {
                NumberHandling = JsonNumberHandling.AllowReadingFromString | JsonNumberHandling.WriteAsString
            };
            var data = JsonSerializer.Deserialize<List<User>>(jsonData, options);
            if (data == null) return false;
            foreach (var item in data)
            {
                context.Users.Add(item);
                await context.SaveChangesAsync();
            }
            return true;
        }
        public async Task<bool> SeedUsers()
        {
            if (context.Users.Any())
            {
                return false;
            }
            await SeedUsersDetail("Database/SeedData/SellerData.json");
            await SeedUsersDetail("Database/SeedData/AdminData.json");
            await SeedUsersDetail("Database/SeedData/CustomerData.json");
            await SeedUsersDetail("Database/SeedData/ShipperData.json");

            return true;
        }

        public async Task<bool> SeedFoods()
        {
            if (context.Foods.Any())
            {
                return false;
            }

            var jsonData = File.ReadAllText("Database/SeedData/FoodData.json", Encoding.UTF8);
            var options = new JsonSerializerOptions()
            {
                NumberHandling = JsonNumberHandling.AllowReadingFromString | JsonNumberHandling.WriteAsString
            };
            var foodsData = JsonSerializer.Deserialize<List<Food>>(jsonData, options);
            if (foodsData == null) return false;

            foreach (var item in foodsData)
            {
                context.Foods.Add(item);
                await context.SaveChangesAsync();
            }
            // context.SaveChanges();
            return true;
        }
        public async Task<bool> SeedAccounts()
        {
            if (context.Accounts.Any())
            {
                return false;
            }

            var jsonData = File.ReadAllText("Database/SeedData/AccountData.json", Encoding.UTF8);
            var options = new JsonSerializerOptions()
            {
                NumberHandling = JsonNumberHandling.AllowReadingFromString | JsonNumberHandling.WriteAsString
            };
            var accountsData = JsonSerializer.Deserialize<List<Account>>(jsonData, options);
            if (accountsData == null) return false;

            using var hmac = new HMACSHA512();
            var userId = 1;
            foreach (var data in accountsData)
            {
                data.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(data.Password));
                data.PasswordSalt = hmac.Key;
                data.UserId = userId;
                userId++;
                context.Accounts.Add(data);
                await context.SaveChangesAsync();
            }
            return true;
        }

        public async Task<bool> SeedGroupDetail(){
            if (context.GroupDetails.Any())
            {
                return false;
            }
            var jsonData = File.ReadAllText("Database/SeedData/GroupDetail.json", Encoding.UTF8);
            var options = new JsonSerializerOptions()
            {
                NumberHandling = JsonNumberHandling.AllowReadingFromString | JsonNumberHandling.WriteAsString,
            };
            var groupDetailsData = JsonSerializer.Deserialize<List<GroupDetail>>(jsonData, options);
            if (groupDetailsData == null) return false;
            foreach (var data in groupDetailsData)
            {
                data.EnableGroupDetail = true;
                context.GroupDetails.Add(data);
                await context.SaveChangesAsync();
            }
            return true;
        }
    }
}