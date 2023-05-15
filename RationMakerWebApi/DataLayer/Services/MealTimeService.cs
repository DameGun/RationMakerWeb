using Microsoft.EntityFrameworkCore;
using RationMakerWebApi.DataLayer.Interfaces;
using RationMakerWebApi.DataLayer.Models;

namespace RationMakerWebApi.DataLayer.Services
{
	public class MealTimeService : IMealTimeService
	{
		private readonly ApplicationDbContext _context;

		public MealTimeService(ApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<MealTime?> AddMealTimeAsync(MealTime mealTime)
		{
			try
			{
				await _context.MealTime.AddAsync(mealTime);
				await _context.SaveChangesAsync();
				return await _context.MealTime.FindAsync(mealTime.Id);
			}
			catch (Exception ex)
			{
				return null;
			}
		}

		public async Task<(bool, string)> DeleteMealTimeAsync(MealTime mealTime)
		{
			try
			{
				var dbProduct = await _context.MealTime.FindAsync(mealTime.Id);

				if (dbProduct == null) return (false, "MealTime could not be found");

				_context.MealTime.Remove(mealTime);
				await _context.SaveChangesAsync();
				return (true, "MealTime deleted");
			}
			catch (Exception ex)
			{
				return (false, $"An error occured. Error Message: {ex.Message}");
			}
		}

		public async Task<MealTime?> GetMealTimeAsync(int id)
		{
			try
			{
				return await _context.MealTime.Include(m => m.Meal).ThenInclude(m => m.Category).FirstOrDefaultAsync(i => i.Id == id);
			}
			catch (Exception ex)
			{
				return null;
			}
		}

		public async Task<MealTime?> UpdateMealTimeAsync(MealTime mealTime)
		{
			try
			{
				_context.Entry(mealTime).State = EntityState.Modified;
				await _context.SaveChangesAsync();
				return mealTime;
			}
			catch (Exception ex)
			{
				return null;
			}
		}
	}
}
