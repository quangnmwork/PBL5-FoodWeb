using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodWeb.API.Database.Entities;

namespace FoodWeb.API.Database.IRepositories
{
    public interface IRoomDetailRepository
    {
        public RoomDetail CreateRoomDetail(int group, string userName, string message);
        public List<RoomDetail> GetRoomDetailByRoomId(int roomId);
        public List<RoomDetail> GetAllRoomDetail();
    }
}