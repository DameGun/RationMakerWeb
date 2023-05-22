using RationMakerWebApi.DataLayer.Models;

namespace RationMakerWebApi.DataLayer.Interfaces
{
	public interface IDailyMealPlan
	{
		Task<DailyMealPlan?> GetDailyMealPlanAsync(int id);
		Task<List<DailyMealPlan>?> GetAll(string email);
		Task<DailyMealPlan?> AddDailyMealPlanAsync(DailyMealPlan dailyMealPlan);
		Task<DailyMealPlan> UpdateDailyMealPlanAsync(DailyMealPlan dailyMealPlan);
		Task<(bool, string)> DeleteDailyMealPlan(DailyMealPlan dailyMealPlan);
	}
}
