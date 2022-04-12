using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FoodWeb.API.Database;
using FoodWeb.API.Database.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace FoodWeb.API.Filter
{
    public class test : ActionFilterAttribute
    {
        private readonly IServiceProvider _serviceProvider;
        public test(IServiceProvider serviceProvider)
        {
            this._serviceProvider = serviceProvider;

        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            //var a = ServiceProvider();

            var user = context.HttpContext.User;
            Console.WriteLine(user);
            // var Id = user.FindFirst(ClaimTypes.NameIdentifier).Value;
            // Console.WriteLine(Id);

            if (!user.Identity.IsAuthenticated)
            {
                context.Result = new UnauthorizedObjectResult("user is unauthorized");
            }
            
            else
            {
                var contextDB = _serviceProvider.GetRequiredService<DataContext>();
                Console.WriteLine(contextDB.Users);
                base.OnActionExecuting(context);
            }
        }
    }
}