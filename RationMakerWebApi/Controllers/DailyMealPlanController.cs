using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RationMakerWebApi.DataLayer.Interfaces;
using RationMakerWebApi.DataLayer.Models;

namespace RationMakerWebApi.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class DailyMealPlanController : ControllerBase
	{
		private readonly IDailyMealPlan _dailyMealPlanService;

		public DailyMealPlanController(IDailyMealPlan dailyMealPlanService)
		{
			_dailyMealPlanService = dailyMealPlanService;
		}

		[HttpGet("getPlan/{id:int}")]
		public async Task<IActionResult> GetDailyMealPlan(int id)
		{
			var dbDailyMealPlan = await _dailyMealPlanService.GetDailyMealPlanAsync(id);
			return dbDailyMealPlan == null 
				? StatusCode(StatusCodes.Status204NoContent) 
				: StatusCode(StatusCodes.Status200OK, dbDailyMealPlan);
		}

		[HttpGet("getAllPlans/{userId:int}")]
		public async Task<IActionResult> GetAll(int userId)
		{
			var dbPlans = await _dailyMealPlanService.GetAll(userId);
			return dbPlans == null 
				? StatusCode(StatusCodes.Status204NoContent) 
				: StatusCode(StatusCodes.Status200OK, dbPlans);
		}

		[HttpPost("add")]
		public async Task<IActionResult> AddDailyMealPlan(DailyMealPlan dailyMealPlanDto)
		{
			
			var dbDailyMealPlan = await _dailyMealPlanService.AddDailyMealPlanAsync(dailyMealPlanDto);

			return dbDailyMealPlan == null
				? StatusCode(StatusCodes.Status500InternalServerError, $"{dailyMealPlanDto.Name} could not be added.")
				: StatusCode(StatusCodes.Status201Created, dbDailyMealPlan);
		}

		[HttpPost("update/{id:int}")]
		public async Task<IActionResult> UpdateDailyMealPlan(int id, DailyMealPlan dailyMealPlanDto)
		{
			if (id != dailyMealPlanDto.Id) return BadRequest();

			var dbDailyMealPlan = await _dailyMealPlanService.GetDailyMealPlanAsync(id);

			return dbDailyMealPlan == null
				? StatusCode(StatusCodes.Status500InternalServerError)
				: StatusCode(StatusCodes.Status200OK, dbDailyMealPlan);
		}

		[HttpDelete("delete/{id:int}")]
		public async Task<IActionResult> DeleteDailyMealPlan(int id)
		{
			var dbDailyMealPlan = await _dailyMealPlanService.GetDailyMealPlanAsync(id);
			var status = false;
			var message = string.Empty;

			if (dbDailyMealPlan != null)
			{
				(status, message) = await _dailyMealPlanService.DeleteDailyMealPlan(dbDailyMealPlan);
			}

			return status == false
				? StatusCode(StatusCodes.Status500InternalServerError, message)
				: StatusCode(StatusCodes.Status200OK, dbDailyMealPlan);
		}
	}
}
