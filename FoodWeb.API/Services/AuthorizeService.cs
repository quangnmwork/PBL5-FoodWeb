using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;

namespace FoodWeb.API.Services
{
    public class AuthorizeService : IAuthorizeService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IUserRepository _userRepository;
        private readonly IGroupRepository _groupRepository;
        private readonly IGroupDetailRepository _groupDetailRepository;

        public AuthorizeService(IAccountRepository accountRepository, 
                             IUserRepository userRepository, 
                             IGroupRepository groupRepository,
                             IGroupDetailRepository groupDetailRepository)
        {
            this._accountRepository = accountRepository;
            this._userRepository = userRepository;
            this._groupRepository = groupRepository;
            this._groupDetailRepository = groupDetailRepository;
        }

        public string GetGroupById(int Id)
        {
            var user = _userRepository.GetUserById(Id);
            var account = _accountRepository.GetAccountByUserId(user.IdUser);
            var detailGroup = _groupDetailRepository.GetGroupDetailByIdAccount(account.IdAccount);
            var group = _groupRepository.GetGroupById(detailGroup.GroupId);
            return group.NameGroup.ToLower();
        }

        public bool IsCustommer(int Id)
        {
            var group = GetGroupById(Id);
            return group == "customer";
        }

        public bool IsSeller(int Id)
        {
            var group = GetGroupById(Id);
            return group == "seller";
        }
        public bool IsAdmin(int Id)
        {
            var group = GetGroupById(Id);
            return group == "admin";
        }
    }
}