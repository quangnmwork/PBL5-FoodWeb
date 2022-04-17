using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodWeb.API.DTOs
{
    public class PageDTO
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}