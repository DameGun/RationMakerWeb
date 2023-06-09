﻿using RationMakerWebApi.DataLayer.Models;

namespace RationMakerWebApi.DataLayer.Interfaces
{
	public interface IMealTimeService
	{
		Task<MealTime?> GetMealTimeAsync(int id);
		Task<MealTime?> GetMealTimeAsNoTracking(int id);
		Task<MealTime?> AddMealTimeAsync(MealTime mealTime);
		Task<MealTime?> UpdateMealTimeAsync(MealTime mealTime);
		Task<MealTime?> RemoveProductAsync(MealTime mealTime);
		Task<(bool, string)> DeleteMealTimeAsync(MealTime mealTime);
	}
}
