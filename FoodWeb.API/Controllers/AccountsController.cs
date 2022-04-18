using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using FoodWeb.API.Database;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.Database.Repositories;
using FoodWeb.API.DTOs;
using FoodWeb.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodWeb.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IUserRepository _userRepository;
        private readonly IGroupRepository _groupRepository;
        private readonly IGroupDetailRepository _groupDetailRepository;
        private readonly ITokenService _tokenService;
        public AccountsController(IAccountRepository accountRepository, 
                                  IUserRepository userRepository, 
                                  IGroupRepository groupRepository,
                                  IGroupDetailRepository groupDetailRepository,
                                  ITokenService tokenService)
        {
            this._accountRepository = accountRepository;
            this._userRepository = userRepository;
            this._groupRepository = groupRepository;
            this._groupDetailRepository = groupDetailRepository;
            this._tokenService = tokenService;
        }

        [HttpPost("register")]
        public ActionResult<AccountResponse> Register(RegisterDTO registerDTO)
        {
            if(_accountRepository.GetAccountByEmail(registerDTO.Email) != null){
                return BadRequest("Email is existed!");
            }

            if(_userRepository.GetUserByName(registerDTO.NameUser) != null){
                return BadRequest("NameUser is existed!");
            }

            if(_groupRepository.GetGroupByNameGroup(registerDTO.NameGroup) == null){
                return BadRequest("Not found group user");
            }

            _userRepository.CreateUser(registerDTO);
            _accountRepository.CreateAccount(registerDTO);
            
            int idAccount = _accountRepository.GetAccountByEmail(registerDTO.Email).IdAccount;
            int idGroup = _groupRepository.GetGroupByNameGroup(registerDTO.NameGroup).IdGroup;
            _groupDetailRepository.CreateGroupDetail(idAccount, idGroup);

            return Ok(new AccountResponse(){
                Email = registerDTO.Email,
                NameUser = registerDTO.NameUser,
                NameGroup = registerDTO.NameGroup,
                Token = _tokenService.CreateToken(_userRepository.GetUserByName(registerDTO.NameUser))
            });
        }

        [HttpPost("login")]
        public ActionResult<AccountResponse> Login(LoginDTO loginDTO)
        {
            var account = _accountRepository.GetAccountByEmail(loginDTO.Email);
            if(account == null) return Unauthorized("Invalid username or password");

            using var hmac = new HMACSHA512(account.PasswordSalt);
            var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            for(int i = 0; i < ComputeHash.Length; i++){
                if(ComputeHash[i] != account.PasswordHash[i])      
                    return Unauthorized("Invalid username or password");
            }

            var user = _userRepository.GetUserById(account.UserId);
            
            var detailGroup = _groupDetailRepository.GetGroupDetailByIdAccount(account.IdAccount);
            var nameGroup = _groupRepository.GetGroupById(detailGroup.GroupId).NameGroup;

            return Ok(new AccountResponse(){
                Email = loginDTO.Email,
                NameUser = user.NameUser,
                NameGroup = nameGroup,
                Token = _tokenService.CreateToken(user)
            });
        }

        [HttpPatch("changePassword")]
        [Authorize]
        public ActionResult<AccountResponse> ChangePassword(ChangePasswordDTO changePassword)
        {
            int Id = Int32.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var account = _accountRepository.GetAccountByUserId(Id);
            using var hmac = new HMACSHA512(account.PasswordSalt);
            var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(changePassword.OldPassword));

            for(int i = 0; i < ComputeHash.Length; i++){
                if(ComputeHash[i] != account.PasswordHash[i])      
                    return BadRequest("Password invalid");
            }

            var profile = _userRepository.GetProfileUserById(Id);
            var nameGroup = _groupRepository.GetNameGroupByNameUser(profile.NameUser);
            var user = _userRepository.GetUserById(Id);

            _accountRepository.ChangePassword(Id, changePassword.NewPassword);

            return Ok(new AccountResponse{
                Email = account.Email,
                NameUser = profile.NameUser,
                NameGroup = nameGroup,
                Token = _tokenService.CreateToken(user)
            });
        }
    }
}