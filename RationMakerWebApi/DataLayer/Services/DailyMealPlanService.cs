using Microsoft.EntityFrameworkCore;
using RationMakerWebApi.DataLayer.Interfaces;
using RationMakerWebApi.DataLayer.Models;
using RationMakerWebApi.DataLayer;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.AspNetCore.Http.HttpResults;

namespace RationMakerWebApi.DataLayer.Services
{
	public class DailyMealPlanService : IDailyMealPlan
	{
		private readonly ApplicationDbContext _context;

		public DailyMealPlanService(ApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<DailyMealPlan?> AddDailyMealPlanAsync(DailyMealPlan dailyMealPlan)
		{
			try
			{
				await _context.DailyMealPlan.AddAsync(dailyMealPlan);
				await _context.SaveChangesAsync();
				return await _context.DailyMealPlan.FindAsync(dailyMealPlan.Id);
			}
			catch (Exception ex)
			{
				return null;
			}
		}

		public async Task<(bool, string)> DeleteDailyMealPlan(DailyMealPlan dailyMealPlan)
		{
			try
			{
				var dbProduct = await _context.DailyMealPlan.FindAsync(dailyMealPlan.Id);

				if (dbProduct == null) return (false, "DailyMealPlan could not be found");

				_context.DailyMealPlan.Remove(dailyMealPlan);
				await _context.SaveChangesAsync();
				return (true, "DailyMealPlan deleted");
			}
			catch (Exception ex)
			{
				return (false, $"An error occured. Error Message: {ex.Message}");
			}
		}

		public async Task<List<DailyMealPlan>?> GetAll(string email)
		{
			try
			{
				return await _context.DailyMealPlan
					.Include(m => m.MealTimes)
						.ThenInclude(m => m.Meal)
						.ThenInclude(p => p.Category)
					.Include(m => m.AppUser)
					.Where(d => d.AppUser.Email == email)
					.ToListAsync();
			}
			catch (Exception ex)
			{
				return null;
			}
		}

		public async Task<DailyMealPlan?> GetDailyMealPlanAsync(int id)
		{
			try
			{
				return await _context.DailyMealPlan
					.Include(m => m.MealTimes)
						.ThenInclude(m => m.Meal)
						.ThenInclude(p => p.Category)
					.AsSplitQuery()
					.FirstOrDefaultAsync(i => i.Id == id);
			}
			catch (Exception ex)
			{
				return null;
			}
		}

		public async Task<DailyMealPlan> UpdateDailyMealPlanAsync(DailyMealPlan dailyMealPlan)
		{
			try
			{
				_context.Entry(dailyMealPlan).State = EntityState.Modified;
				await _context.SaveChangesAsync();
				return dailyMealPlan;
			}
			catch (Exception ex)
			{
				return null;
			}
		}
	}
}
