using Microsoft.EntityFrameworkCore.Migrations;

namespace FoodWeb.API.database.Migrations
{
    public partial class Add_AdminHidden : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isAdminHidden",
                table: "Foods",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isAdminHidden",
                table: "Foods");
        }
    }
}
