using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RationMakerWebApi.Migrations
{
    /// <inheritdoc />
    public partial class DailyMealPlanFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ARM",
                table: "DailyMealPlan");

            migrationBuilder.DropColumn(
                name: "BMR",
                table: "DailyMealPlan");

            migrationBuilder.DropColumn(
                name: "DailyCaloriesRate",
                table: "DailyMealPlan");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "ARM",
                table: "DailyMealPlan",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "BMR",
                table: "DailyMealPlan",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "DailyCaloriesRate",
                table: "DailyMealPlan",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
