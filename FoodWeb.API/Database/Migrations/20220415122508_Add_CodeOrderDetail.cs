using Microsoft.EntityFrameworkCore.Migrations;

namespace FoodWeb.API.Database.Migrations
{
    public partial class Add_CodeOrderDetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CodeOrderDetail",
                table: "OrderDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CodeOrderDetail",
                table: "OrderDetails");
        }
    }
}
