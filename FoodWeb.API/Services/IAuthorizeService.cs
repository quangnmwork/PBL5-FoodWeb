using FoodWeb.API.Database.Entities;

namespace FoodWeb.API.Services
{
    public interface IAuthorizeService
    {
        public bool IsCustommer(int Id);

        public bool IsShipper(int Id);

        public bool IsSeller(int Id);

        public bool IsAdmin(int Id);
    }
}