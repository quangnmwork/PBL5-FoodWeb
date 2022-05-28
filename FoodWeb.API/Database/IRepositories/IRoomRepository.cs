using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodWeb.API.Database.Entities;

namespace FoodWeb.API.Database.IRepositories
{
    public interface IRoomRepository
    {
        public Room CreateRoom(int OrderDetailId);
        public List<Room> GetAllRoom();
    }
}