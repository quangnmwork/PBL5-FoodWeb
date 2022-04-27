using Microsoft.EntityFrameworkCore.Migrations;

namespace FoodWeb.API.database.Migrations
{
    public partial class Add_CodePermissionDetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CodePermissionDetail",
                table: "PermissionDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CodePermissionDetail",
                table: "PermissionDetails");
        }
    }
}
