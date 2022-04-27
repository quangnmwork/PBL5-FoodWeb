using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodWeb.API.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace FoodWeb.API.Database
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        // Authorization
        public DbSet<Account> Accounts { get; set; }
        public DbSet<GroupDetail> GroupDetails { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<PermissionDetail> PermissionDetails { get; set; }
        public DbSet<Permission> Permissions { get; set; }

        // System
        public DbSet<User> Users { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<RoomDetail> RoomDetails { get; set; }
        public DbSet<Food> Foods { get; set; }
        public DbSet<Category> Categorys { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<ListOrder> ListOrders { get; set; }
    
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Authorization
            builder.Entity<Account>(b => {
                b.HasKey(s => s.IdAccount);
                b.Property(s => s.Email).HasMaxLength(100).IsRequired(true);
                b.Property(s => s.Password).HasMaxLength(50).IsRequired(true);
                b.Property(s => s.PasswordHash).IsRequired(true);
                b.Property(s => s.PasswordSalt).IsRequired(true);
            });

            builder.Entity<Group>(b => {
                b.HasKey(s => s.IdGroup);
                b.Property(s => s.IdGroup).ValueGeneratedNever();
                b.Property(s => s.NameGroup).HasMaxLength(50).IsRequired(true);
            });

            builder.Entity<Permission>(b => {
                b.HasKey(s => s.IdPermission);
                b.Property(s => s.IdPermission).ValueGeneratedNever();
                b.Property(s => s.NamePermission).HasMaxLength(50).IsRequired(true);
                b.Property(s => s.EnablePermission).IsRequired(true);
            });

            builder.Entity<GroupDetail>(b => {
                b.HasKey(s => s.IdGroupDetail);
                b.Property(s => s.EnableGroupDetail).IsRequired(true);
                b.Property(s => s.TimeEnable).IsRequired(false);
                b.Property(s => s.DescriptionBan).IsRequired(false);
                b.HasOne(s => s.Account).WithMany(s => s.GroupDetails).HasForeignKey(s => s.AccountId).OnDelete(DeleteBehavior.NoAction);
                b.HasOne(s => s.Group).WithMany(s => s.GroupDetails).HasForeignKey(s => s.GroupId).OnDelete(DeleteBehavior.NoAction);
            });

            builder.Entity<PermissionDetail>(b => {
                b.HasKey(s => s.IdPermissionDetail);
                b.Property(s => s.DescriptionPermissionDetail).IsRequired(true);
                b.Property(s => s.EnablePermissionDetail).IsRequired(true);
                b.Property(s => s.CodePermissionDetail).IsRequired(true);
                b.HasOne(s => s.Permission).WithMany(s => s.PermissionDetails).HasForeignKey(s => s.PermissionId);
                b.HasOne(s => s.Group).WithMany(s => s.PermissionDetails).HasForeignKey(s => s.GroupId);
            });

            // System
            builder.Entity<User>(b => {
                b.HasKey(s => s.IdUser);
                b.Property(s => s.NameUser).HasMaxLength(100).IsRequired(true);
                b.Property(s => s.Phone).HasMaxLength(10).IsRequired(true);
                b.Property(s => s.Address).HasMaxLength(150).IsRequired(true);
                b.Property(s => s.Money).IsRequired(false);
                b.Property(s => s.Avatar).IsRequired(false);
                b.HasOne(s => s.Account).WithOne(s => s.User).HasForeignKey<Account>(s => s.UserId);
            });

            builder.Entity<Room>(b => {
                b.HasKey(s => s.IdRoom);
                b.Property(s => s.NameRoom).HasMaxLength(100).IsRequired(true);
            });

            builder.Entity<RoomDetail>(b => {
                b.HasKey(s => s.IdRoomDetail);
                b.Property(s => s.Message).IsRequired(false);
                b.Property(s => s.TimeChat).IsRequired(false);
                b.HasOne(s => s.User).WithMany(s => s.RoomDetails).HasForeignKey(s => s.UserId).OnDelete(DeleteBehavior.NoAction);
                b.HasOne(s => s.Room).WithMany(s => s.RoomDetails).HasForeignKey(s => s.RoomId).OnDelete(DeleteBehavior.NoAction);
            });

            builder.Entity<Food>(b => {
                b.HasKey(s => s.IdFood);
                b.Property(s => s.NameFood).HasMaxLength(150).IsRequired(true);
                b.Property(s => s.PriceFood).IsRequired(true);
                b.Property(s => s.TimeCreate).IsRequired(true);
                b.Property(s => s.DescriptionFood).IsRequired(true);
                b.Property(s => s.isHidden).IsRequired(true);
                b.Property(s => s.isAdminHidden).IsRequired(true);
                b.Property(s => s.ImageFood).IsRequired(true);
                b.HasOne(s => s.User).WithMany(s => s.Foods).HasForeignKey(s => s.UserId).OnDelete(DeleteBehavior.NoAction);
                b.HasOne(s => s.Category).WithMany(s => s.Foods).HasForeignKey(s => s.CategoryId).OnDelete(DeleteBehavior.NoAction);
            });

            builder.Entity<Category>(b => {
                b.HasKey(s => s.IdCategory);
                b.Property(s => s.NameCategory).HasMaxLength(50).IsRequired(true);
            });

            builder.Entity<Payment>(b => {
                b.HasKey(s => s.IdPayment);
                b.Property(s => s.TimePayment).IsRequired(false);
                b.Property(s => s.PriceTotalFood).IsRequired(true);
                b.Property(s => s.PriceShip).IsRequired(true);
                b.Property(s => s.IsPayment).IsRequired(true);
            });

            builder.Entity<OrderDetail>(b => {
                b.HasKey(s => s.IdOrderDetail);
                b.Property(s => s.TimeOrderDetail).IsRequired(true);
                b.Property(s => s.IsShip).IsRequired(true);
                b.Property(s => s.TimeShipDone).IsRequired(false);
                b.Property(s => s.ChoiceShip).IsRequired(true);
                b.Property(s => s.CodeOrderDetail).IsRequired(true);
                b.HasOne(s => s.Customer).WithMany(s => s.OrderDetailCustomers).HasForeignKey(s => s.CustomerId).OnDelete(DeleteBehavior.NoAction);
                b.HasOne(s => s.Shipper).WithMany(s => s.OrderDetailShippers).HasForeignKey(s => s.ShipperId).IsRequired(false);
                b.HasOne(s => s.Payment).WithOne(s => s.OrderDetail).HasForeignKey<Payment>(s => s.OrderDetailId).OnDelete(DeleteBehavior.NoAction);
                b.HasOne(s => s.Room).WithOne(s => s.OrderDetail).HasForeignKey<Room>(s => s.OrderDetailId).OnDelete(DeleteBehavior.NoAction);
            });

            builder.Entity<ListOrder>(b => {
                b.HasKey(s => s.IdListOrder);
                b.Property(s => s.Number).IsRequired(true);
                b.HasOne(s => s.Food).WithMany(s => s.ListOrders).HasForeignKey(s => s.FoodId).OnDelete(DeleteBehavior.NoAction);
                b.HasOne(s => s.OrderDetail).WithMany(s => s.ListOrders).HasForeignKey(s => s.OrderDetailId).OnDelete(DeleteBehavior.NoAction);
            });
        }
    }
}