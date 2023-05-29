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

		public async Task<MealTime?> GetMealTimeAsNoTracking(int id)
		{
			try
			{
				return await _context.MealTime.Include(m => m.Meal).ThenInclude(m => m.Category).AsNoTracking().FirstOrDefaultAsync(i => i.Id == id);
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
				Console.WriteLine(_context.ChangeTracker.DebugView.LongView);
				return mealTime;
			}
			catch (Exception ex)
			{
				return null;
			}
		}
		public async Task<MealTime?> RemoveProductAsync(MealTime mealTime)
		{
			try
			{
				var dbMealTime = await GetMealTimeAsync(mealTime.Id);

				var product = dbMealTime.Meal.Except(mealTime.Meal).FirstOrDefault();

				if (product == null) return null;

				dbMealTime.Meal.Remove(product);
				await _context.SaveChangesAsync();
				return dbMealTime;
			}
			catch (Exception ex)
			{
				return null;
			}
		}

		public async Task<(bool, string)> UpdateJoinTable(int mealTimeId, Product deletedProduct)
		{
			try
			{
				var reference = _context.Set<Dictionary<string, object>>()
						.Where(m => m.ContainsKey(mealTimeId.ToString()))
						.Where(p => p.Values.Contains(deletedProduct.Id))
						.FirstOrDefault();
				if (reference == null) return (false, "Join table could not be updated");
				_context.Set<Dictionary<string, object>>().Remove(reference);
				await _context.SaveChangesAsync();
				return (true, "Join table updated");
				
			}
			catch (Exception ex)
			{
				return (false, $"An error occured. Error Message: {ex.Message}");
			}
		}
	}
}
