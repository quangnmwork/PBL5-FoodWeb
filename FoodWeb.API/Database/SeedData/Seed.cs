using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using FoodWeb.API.Database;
using FoodWeb.API.Database.Entities;

namespace PBL5.FoodWeb.API.Database.SeedData
{
    public class Seed
    {   
        private readonly DataContext context;
        public Seed(DataContext context){
            this.context = context;
        }

        public void SeedGroups()
        {
            if(context.Groups.Any()) {
                // foreach (var item in context.Groups)
                //     context.Groups.Remove(item);
                // context.SaveChanges();
                return;
            }

            var jsonData = File.ReadAllText("Database/SeedData/GroupData.json");
            var groupsData =  JsonSerializer.Deserialize<List<Group>>(jsonData);
            if(groupsData == null) return;

            foreach(var item in groupsData){
                context.Groups.Add(item);
            }
            context.SaveChanges();
        }

        public void SeedPermissions()
        {
            if(context.Permissions.Any()) {
                // foreach (var item in context.Permissions)
                //     context.Permissions.Remove(item);
                // context.SaveChanges();
                return;
            }

            var jsonData = File.ReadAllText("Database/SeedData/PermissionData.json");
            var permissionsData =  JsonSerializer.Deserialize<List<Permission>>(jsonData);
            if(permissionsData == null) return;

            foreach(var item in permissionsData){
                context.Permissions.Add(item);
            }
            context.SaveChanges();
        }

        public void SeedPermissionDetails()
        {
            if(context.PermissionDetails.Any()) {
                return;
            }
            // else{
            //     context.SaveChanges();
            // }

            var jsonData = File.ReadAllText("Database/SeedData/PermissionDetailData.json");
            var permissionDetailsData =  JsonSerializer.Deserialize<List<PermissionDetail>>(jsonData);
            if(permissionDetailsData == null) return;

            foreach(var item in permissionDetailsData){
                context.PermissionDetails.Add(item);
            }
            context.SaveChanges();
        }

        public void SeedCategories()
        {
            if(context.Categorys.Any()){
                return;
            }

            var jsonData = File.ReadAllText("Database/SeedData/CategoryData.json");
            var categoriesData =  JsonSerializer.Deserialize<List<Category>>(jsonData);
            if(categoriesData == null) return;

            foreach(var item in categoriesData){
                context.Categorys.Add(item);
            }
            context.SaveChanges();

        }
    }
}