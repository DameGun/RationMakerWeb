using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RationMakerWebApi.Migrations
{
    /// <inheritdoc />
    public partial class JoinTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MealTime_DailyMealPlan_DailyMealPlanId",
                table: "MealTime");

            migrationBuilder.AlterColumn<string>(
                name: "DailyActivity",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "DailyMealPlanId",
                table: "MealTime",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "MealTimeProducts",
                columns: table => new
                {
                    MealTimeId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealTimeProducts", x => new { x.MealTimeId, x.ProductId });
                    table.ForeignKey(
                        name: "FK_MealTimeProducts_MealTime_MealTimeId",
                        column: x => x.MealTimeId,
                        principalTable: "MealTime",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MealTimeProducts_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MealTimeProducts_ProductId",
                table: "MealTimeProducts",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_MealTime_DailyMealPlan_DailyMealPlanId",
                table: "MealTime",
                column: "DailyMealPlanId",
                principalTable: "DailyMealPlan",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MealTime_DailyMealPlan_DailyMealPlanId",
                table: "MealTime");

            migrationBuilder.DropTable(
                name: "MealTimeProducts");

            migrationBuilder.AlterColumn<int>(
                name: "DailyActivity",
                table: "Users",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "DailyMealPlanId",
                table: "MealTime",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateTable(
                name: "MealTimeProduct",
                columns: table => new
                {
                    MealId = table.Column<int>(type: "int", nullable: false),
                    MealsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealTimeProduct", x => new { x.MealId, x.MealsId });
                    table.ForeignKey(
                        name: "FK_MealTimeProduct_MealTime_MealsId",
                        column: x => x.MealsId,
                        principalTable: "MealTime",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MealTimeProduct_Products_MealId",
                        column: x => x.MealId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MealTimeProduct_MealsId",
                table: "MealTimeProduct",
                column: "MealsId");

            migrationBuilder.AddForeignKey(
                name: "FK_MealTime_DailyMealPlan_DailyMealPlanId",
                table: "MealTime",
                column: "DailyMealPlanId",
                principalTable: "DailyMealPlan",
                principalColumn: "Id");
        }
    }
}
