﻿// <auto-generated />
using System;
using FoodWeb.API.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FoodWeb.API.Database.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20220416031810_Change_TimePayment_AllowNull")]
    partial class Change_TimePayment_AllowNull
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.15")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("FoodWeb.API.Database.Entities.Account", b =>
                {
                    b.Property<int>("IdAccount")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("IdAccount");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.Category", b =>
                {
                    b.Property<int>("IdCategory")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("NameCategory")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("IdCategory");

                    b.ToTable("Categorys");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.Food", b =>
                {
                    b.Property<int>("IdFood")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("DescriptionFood")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageFood")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NameFood")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<double>("PriceFood")
                        .HasColumnType("float");

                    b.Property<DateTime>("TimeCreate")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<bool>("isHidden")
                        .HasColumnType("bit");

                    b.HasKey("IdFood");

                    b.HasIndex("CategoryId");

                    b.HasIndex("UserId");

                    b.ToTable("Foods");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.Group", b =>
                {
                    b.Property<int>("IdGroup")
                        .HasColumnType("int");

                    b.Property<string>("NameGroup")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("IdGroup");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.GroupDetail", b =>
                {
                    b.Property<int>("IdGroupDetail")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AccountId")
                        .HasColumnType("int");

                    b.Property<bool>("EnableGroupDetail")
                        .HasColumnType("bit");

                    b.Property<int>("GroupId")
                        .HasColumnType("int");

                    b.HasKey("IdGroupDetail");

                    b.HasIndex("AccountId");

                    b.HasIndex("GroupId");

                    b.ToTable("GroupDetails");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.ListOrder", b =>
                {
                    b.Property<int>("IdListOrder")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("FoodId")
                        .HasColumnType("int");

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.Property<int>("OrderDetailId")
                        .HasColumnType("int");

                    b.HasKey("IdListOrder");

                    b.HasIndex("FoodId");

                    b.HasIndex("OrderDetailId");

                    b.ToTable("ListOrders");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.OrderDetail", b =>
                {
                    b.Property<int>("IdOrderDetail")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool?>("ChoiceShip")
                        .IsRequired()
                        .HasColumnType("bit");

                    b.Property<string>("CodeOrderDetail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("IsShip")
                        .IsRequired()
                        .HasColumnType("bit");

                    b.Property<DateTime>("TimeOrderDetail")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("TimeShipDone")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("IdOrderDetail");

                    b.HasIndex("UserId");

                    b.ToTable("OrderDetails");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.Payment", b =>
                {
                    b.Property<int>("IdPayment")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("IsPayment")
                        .HasColumnType("bit");

                    b.Property<int>("OrderDetailId")
                        .HasColumnType("int");

                    b.Property<double>("PriceShip")
                        .HasColumnType("float");

                    b.Property<double>("PriceTotalFood")
                        .HasColumnType("float");

                    b.Property<DateTime?>("TimePayment")
                        .HasColumnType("datetime2");

                    b.HasKey("IdPayment");

                    b.HasIndex("OrderDetailId")
                        .IsUnique();

                    b.ToTable("Payments");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.Permission", b =>
                {
                    b.Property<int>("IdPermission")
                        .HasColumnType("int");

                    b.Property<bool>("EnablePermission")
                        .HasColumnType("bit");

                    b.Property<string>("NamePermission")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("IdPermission");

                    b.ToTable("Permissions");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.PermissionDetail", b =>
                {
                    b.Property<int>("IdPermissionDetail")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DescriptionPermissionDetail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("EnablePermissionDetail")
                        .HasColumnType("bit");

                    b.Property<int>("GroupId")
                        .HasColumnType("int");

                    b.Property<int>("PermissionId")
                        .HasColumnType("int");

                    b.HasKey("IdPermissionDetail");

                    b.HasIndex("GroupId");

                    b.HasIndex("PermissionId");

                    b.ToTable("PermissionDetails");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.Room", b =>
                {
                    b.Property<int>("IdRoom")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("NameRoom")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("OrderDetailId")
                        .HasColumnType("int");

                    b.HasKey("IdRoom");

                    b.HasIndex("OrderDetailId")
                        .IsUnique();

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.RoomDetail", b =>
                {
                    b.Property<int>("IdRoomDetail")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Message")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoomId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("TimeChat")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("IdRoomDetail");

                    b.HasIndex("RoomId");

                    b.HasIndex("UserId");

                    b.ToTable("RoomDetails");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.User", b =>
                {
                    b.Property<int>("IdUser")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Avatar")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double?>("Money")
                        .HasColumnType("float");

                    b.Property<string>("NameUser")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.HasKey("IdUser");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.Account", b =>
                {
                    b.HasOne("FoodWeb.API.Database.Entities.User", "User")
                        .WithOne("Account")
                        .HasForeignKey("FoodWeb.API.Database.Entities.Account", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.Food", b =>
                {
                    b.HasOne("FoodWeb.API.Database.Entities.Category", "Category")
                        .WithMany("Foods")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("FoodWeb.API.Database.Entities.User", "User")
                        .WithMany("Foods")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("User");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.GroupDetail", b =>
                {
                    b.HasOne("FoodWeb.API.Database.Entities.Account", "Account")
                        .WithMany("GroupDetails")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("FoodWeb.API.Database.Entities.Group", "Group")
                        .WithMany("GroupDetails")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Account");

                    b.Navigation("Group");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.ListOrder", b =>
                {
                    b.HasOne("FoodWeb.API.Database.Entities.Food", "Food")
                        .WithMany("ListOrders")
                        .HasForeignKey("FoodId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("FoodWeb.API.Database.Entities.OrderDetail", "OrderDetail")
                        .WithMany("ListOrders")
                        .HasForeignKey("OrderDetailId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Food");

                    b.Navigation("OrderDetail");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.OrderDetail", b =>
                {
                    b.HasOne("FoodWeb.API.Database.Entities.User", "User")
                        .WithMany("OrderDetails")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.Payment", b =>
                {
                    b.HasOne("FoodWeb.API.Database.Entities.OrderDetail", "OrderDetail")
                        .WithOne("Payment")
                        .HasForeignKey("FoodWeb.API.Database.Entities.Payment", "OrderDetailId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("OrderDetail");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.PermissionDetail", b =>
                {
                    b.HasOne("FoodWeb.API.Database.Entities.Group", "Group")
                        .WithMany("PermissionDetails")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FoodWeb.API.Database.Entities.Permission", "Permission")
                        .WithMany("PermissionDetails")
                        .HasForeignKey("PermissionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Group");

                    b.Navigation("Permission");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.Room", b =>
                {
                    b.HasOne("FoodWeb.API.Database.Entities.OrderDetail", "OrderDetail")
                        .WithOne("Room")
                        .HasForeignKey("FoodWeb.API.Database.Entities.Room", "OrderDetailId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("OrderDetail");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.RoomDetail", b =>
                {
                    b.HasOne("FoodWeb.API.Database.Entities.Room", "Room")
                        .WithMany("RoomDetails")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("FoodWeb.API.Database.Entities.User", "User")
                        .WithMany("RoomDetails")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Room");

                    b.Navigation("User");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.Account", b =>
                {
                    b.Navigation("GroupDetails");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.Category", b =>
                {
                    b.Navigation("Foods");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.Food", b =>
                {
                    b.Navigation("ListOrders");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.Group", b =>
                {
                    b.Navigation("GroupDetails");

                    b.Navigation("PermissionDetails");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.OrderDetail", b =>
                {
                    b.Navigation("ListOrders");

                    b.Navigation("Payment");

                    b.Navigation("Room");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.Permission", b =>
                {
                    b.Navigation("PermissionDetails");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.Room", b =>
                {
                    b.Navigation("RoomDetails");
                });

            modelBuilder.Entity("FoodWeb.API.Database.Entities.User", b =>
                {
                    b.Navigation("Account");

                    b.Navigation("Foods");

                    b.Navigation("OrderDetails");

                    b.Navigation("RoomDetails");
                });
#pragma warning restore 612, 618
        }
    }
}
