
using System.Collections.Generic;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.DTOs;

namespace FoodWeb.API.Database.IRepositories
{
    public interface IAdminRepository
    {
        public int GetToTalPageAllProfileByNameGroup(string nameGroup);

        public IEnumerable<ProfileDTO> GetAllProfileByNameGroupPaging(int numberPage, string nameGroup);
    }
}