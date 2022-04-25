using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodWeb.API.Extensions
{
    public static class PageServiceExtensions
    {
        public const int FoodPageSize = 10;     // food của trang home
        
        public const int SellerPageSize = 10;   // seller của trang home

        public const int FoodOfSellerPageSize = 10; // số lượng food của 1 seller cho 1 trang (home)

        public const int FoodOfSellerManagePageSize = 10;   // số lượng các food trong 1 trang của seller (seller manager)

        public const int OrderDetailHistoryPageSize = 10; //List order detail của 1 customer trong phần lịch sử

        public const int OrderDetailChoiceShipPageSize = 10; // list order detail để shipper chọn ship

        public const int ProfilePageSize = 10; // List user do admin quản lý
    }
}