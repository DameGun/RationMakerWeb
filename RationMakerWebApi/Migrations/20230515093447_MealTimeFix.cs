using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RationMakerWebApi.Migrations
{
    /// <inheritdoc />
    public partial class MealTimeFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MealTime_DailyMealPlan_DailyMealPlanId",
                table: "MealTime");

            migrationBuilder.AlterColumn<int>(
                name: "DailyMealPlanId",
                table: "MealTime",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_MealTime_DailyMealPlan_DailyMealPlanId",
                table: "MealTime",
                column: "DailyMealPlanId",
                principalTable: "DailyMealPlan",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MealTime_DailyMealPlan_DailyMealPlanId",
                table: "MealTime");

            migrationBuilder.AlterColumn<int>(
                name: "DailyMealPlanId",
                table: "MealTime",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MealTime_DailyMealPlan_DailyMealPlanId",
                table: "MealTime",
                column: "DailyMealPlanId",
                principalTable: "DailyMealPlan",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
