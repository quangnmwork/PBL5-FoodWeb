using System;
using Microsoft.AspNetCore.Http;

namespace FoodWeb.API.Services
{
    public interface ICloudinaryService
    {
        public string UploadImage(String folder, IFormFile uploadFile);
    }
}