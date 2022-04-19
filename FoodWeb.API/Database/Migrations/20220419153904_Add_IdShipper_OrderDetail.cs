using Microsoft.EntityFrameworkCore.Migrations;

namespace FoodWeb.API.Database.Migrations
{
    public partial class Add_IdShipper_OrderDetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetails_Users_UserId",
                table: "OrderDetails");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "OrderDetails",
                newName: "ShipperId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderDetails_UserId",
                table: "OrderDetails",
                newName: "IX_OrderDetails_ShipperId");

            migrationBuilder.AddColumn<int>(
                name: "CustomerId",
                table: "OrderDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_CustomerId",
                table: "OrderDetails",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetails_Users_CustomerId",
                table: "OrderDetails",
                column: "CustomerId",
                principalTable: "Users",
                principalColumn: "IdUser");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetails_Users_ShipperId",
                table: "OrderDetails",
                column: "ShipperId",
                principalTable: "Users",
                principalColumn: "IdUser");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetails_Users_CustomerId",
                table: "OrderDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetails_Users_ShipperId",
                table: "OrderDetails");

            migrationBuilder.DropIndex(
                name: "IX_OrderDetails_CustomerId",
                table: "OrderDetails");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "OrderDetails");

            migrationBuilder.RenameColumn(
                name: "ShipperId",
                table: "OrderDetails",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderDetails_ShipperId",
                table: "OrderDetails",
                newName: "IX_OrderDetails_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetails_Users_UserId",
                table: "OrderDetails",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "IdUser");
        }
    }
}
