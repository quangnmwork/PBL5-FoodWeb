using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FoodWeb.API.Database.Migrations
{
    public partial class Add_TimeEnable_DesBan_GroupDetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DescriptionBan",
                table: "GroupDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "TimeEnable",
                table: "GroupDetails",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DescriptionBan",
                table: "GroupDetails");

            migrationBuilder.DropColumn(
                name: "TimeEnable",
                table: "GroupDetails");
        }
    }
}
