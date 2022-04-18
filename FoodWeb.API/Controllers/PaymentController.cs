using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodWeb.API.Database.Entities;
using FoodWeb.API.Database.IRepositories;
using FoodWeb.API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodWeb.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentRepository _paymentRepository;

        public PaymentController(IPaymentRepository paymentRepository){
            this._paymentRepository = paymentRepository;
        }
        
        [HttpGet("getPayment/{Id}")]
        public ActionResult<PaymentDTO> GetPaymentById(int Id)
        {
            return Ok(_paymentRepository.GetPaymentById(Id));
        }
    }
}