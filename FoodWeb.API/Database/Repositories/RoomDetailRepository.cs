using System.Runtime.CompilerServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;

namespace FoodWeb.API.Database.Repositories
{
    public class RoomDetailRepository : IRoomDetailRepository
    {
        private readonly DataContext _context;
        public RoomDetailRepository(DataContext context)
        {
            this._context = context;
        }
        public RoomDetail CreateRoomDetail(int groupId, string userName, string message)
        {
            OrderDetail orderDetail = _context.OrderDetails.FirstOrDefault(u => u.Room.IdRoom == groupId);
            Room room = _context.Rooms.FirstOrDefault(u => u.IdRoom == groupId);
            var roomDetail = new RoomDetail
            {
                RoomId = room.IdRoom,
                UserId = orderDetail.CustomerId,
                Message = message,
                TimeChat = DateTime.Now
            };

            _context.RoomDetails.Add(roomDetail);
            _context.SaveChanges();

            return roomDetail;
        }
        public List<RoomDetail> GetAllRoomDetail(){
            return _context.RoomDetails.ToList();
        }
        public List<RoomDetail> GetRoomDetailByRoomId(int roomId){
            return _context.RoomDetails.Where(r => r.RoomId == roomId).ToList();
        }
    }
}