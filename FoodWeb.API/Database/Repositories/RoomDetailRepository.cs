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
            User user = _context.Users.FirstOrDefault(u => u.NameUser == userName);
            var roomDetail = new RoomDetail
            {
                RoomId = groupId,
                UserId = user.IdUser,
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