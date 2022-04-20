using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;

namespace FoodWeb.API.Database.Repositories
{
    public class RoomRepository : IRoomRepository
    {
        private readonly DataContext _context;
        public RoomRepository(DataContext context)
        {
            this._context = context;
        }

        public Room CreateRoom(int OrderDetailId)
        {
            var orderDetail = _context.OrderDetails.FirstOrDefault(u => u.IdOrderDetail == OrderDetailId);
            var nameUser = _context.Users.FirstOrDefault(u => u.IdUser == orderDetail.CustomerId).NameUser;
            var room = new Room
            {
                OrderDetailId = OrderDetailId,
                NameRoom = nameUser + " " + orderDetail.CodeOrderDetail
            };
            orderDetail.Room = room;
            //_context.SaveChanges();

            _context.Rooms.Add(room);
            _context.SaveChanges();

            return room;
        }
    }
}