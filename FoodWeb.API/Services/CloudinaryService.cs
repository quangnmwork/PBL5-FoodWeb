using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Claims;
using System.Text;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using FoodWeb.API.Database.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace FoodWeb.API.Services
{
    public class CloudinaryService : ICloudinaryService
    {
        public readonly IConfiguration _config;
        private readonly Cloudinary _cloudinary;
        public CloudinaryService(IConfiguration config)
        {
            this._config = config;
            // Console.WriteLine(_config.GetValue<String>("CLOUD_NAME") + _config.GetValue<String>("API_KEY"));
            CloudinaryDotNet.Account account = new CloudinaryDotNet.Account(
                _config.GetValue<String>("CLOUD_NAME"),
                _config.GetValue<String>("API_KEY"),
                _config.GetValue<String>("API_SECRET")
            );
            this._cloudinary = new Cloudinary(account);
        }
        public string UploadImage(String folder, IFormFile uploadFile)
        {
            var ms = new MemoryStream();
            uploadFile.CopyTo(ms);
            var fileBytes = ms.ToArray();
            ms = new MemoryStream(fileBytes, 0, fileBytes.Length);

            ImageUploadParams uploadParams = new ImageUploadParams()
            {
                File = new FileDescription("file", ms),
                PublicId = folder + "/" + uploadFile.FileName + DateTime.Now
            };

            ImageUploadResult result = _cloudinary.Upload(uploadParams);
            return _cloudinary.Api.UrlImgUp.BuildUrl(String.Format("{0}.{1}", result.PublicId, result.Format));
        }
    }
}