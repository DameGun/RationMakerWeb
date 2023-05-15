using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RationMakerWebApi.Migrations
{
    /// <inheritdoc />
    public partial class DailyMealPlan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DailyMealPlan",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    DailyCaloriesRate = table.Column<double>(type: "float", nullable: false),
                    BMR = table.Column<double>(type: "float", nullable: false),
                    ARM = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailyMealPlan", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DailyMealPlan_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MealTime",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DailyMealPlanId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealTime", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MealTime_DailyMealPlan_DailyMealPlanId",
                        column: x => x.DailyMealPlanId,
                        principalTable: "DailyMealPlan",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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
                name: "IX_DailyMealPlan_UserId",
                table: "DailyMealPlan",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MealTime_DailyMealPlanId",
                table: "MealTime",
                column: "DailyMealPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_MealTimeProduct_MealsId",
                table: "MealTimeProduct",
                column: "MealsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MealTimeProduct");

            migrationBuilder.DropTable(
                name: "MealTime");

            migrationBuilder.DropTable(
                name: "DailyMealPlan");
        }
    }
}
