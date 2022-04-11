using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodWeb.API.Database.Entities;

namespace FoodWeb.API.Database.IRepositories
{
    public interface IGroupRepository
    {
        public Group GetGroupByName(string name);

        public Group GetGroupById(int id);
    }
}