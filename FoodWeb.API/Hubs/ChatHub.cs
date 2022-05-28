using System.Text.RegularExpressions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.VisualBasic;

namespace FoodWeb.API.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IRoomDetailRepository _roomDetailRepository;
        public ChatHub(
            IRoomDetailRepository roomDetailRepository
        )
        {
            this._roomDetailRepository = roomDetailRepository;
        }
        public Task SendMessageToAll(string user, string message)
        {
            return Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        public Task SendMessageToCaller(string user, string message)
        {
            return Clients.Caller.SendAsync("ReceiveMessage", user, message);
        }

        public Task SendMessageToUser(string connectionId, string user, string message)
        {
            return Clients.Client(connectionId).SendAsync("ReceiveMessage", user, message);
        }

        public Task JoinGroup(int groupId) 
        {
            String group = groupId.ToString();
            return Groups.AddToGroupAsync(Context.ConnectionId, group);
        }

        public Task SendMessageToGroup(int groupId, string user, string message)
        {
            String group = groupId.ToString();
            _roomDetailRepository.CreateRoomDetail(groupId, user, message);
            return Clients.Group(group).SendAsync("ReceiveGroupMessage", user, message, group);
        }
    }
}