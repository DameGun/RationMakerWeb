using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RationMakerWebApi.DataLayer.DTO;
using RationMakerWebApi.DataLayer.Interfaces;
using RationMakerWebApi.DataLayer.Models;
using System.Diagnostics;

namespace RationMakerWebApi.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class DailyMealPlanController : ControllerBase
	{
		private readonly IDailyMealPlan _dailyMealPlanService;
		private readonly IUserService _userService;

		public DailyMealPlanController(IDailyMealPlan dailyMealPlanService, IUserService userService)
		{
			_dailyMealPlanService = dailyMealPlanService;
			_userService = userService;
		}

		[HttpGet("getPlan/{id:int}")]
		public async Task<IActionResult> GetDailyMealPlan(int id)
		{
			var dbDailyMealPlan = await _dailyMealPlanService.GetDailyMealPlanAsync(id);
			return dbDailyMealPlan == null 
				? StatusCode(StatusCodes.Status204NoContent) 
				: StatusCode(StatusCodes.Status200OK, dbDailyMealPlan);
		}

		[HttpGet("getAllPlans")]
		public async Task<IActionResult> GetAll(string email)
		{
			var dbPlans = await _dailyMealPlanService.GetAll(email);
			return dbPlans == null 
				? StatusCode(StatusCodes.Status204NoContent) 
				: StatusCode(StatusCodes.Status200OK, dbPlans);
		}

		[HttpPost("add")]
		public async Task<IActionResult> AddDailyMealPlan(DailyMealPlanDto dailyMealPlanDto)
		{
			var user = await _userService.GetByEmailAsync(dailyMealPlanDto.UserEmail);
			if (user == null) return StatusCode(StatusCodes.Status500InternalServerError, $"{dailyMealPlanDto.Name} could not be added.");

			int userId = user.Id;

			DailyMealPlan dailyMealPlanBuff = new DailyMealPlan
			{
				Name = dailyMealPlanDto.Name,
				UserId = userId,
			};
			var dbDailyMealPlan = await _dailyMealPlanService.AddDailyMealPlanAsync(dailyMealPlanBuff);

			return dbDailyMealPlan == null
				? StatusCode(StatusCodes.Status500InternalServerError, $"{dailyMealPlanDto.Name} could not be added.")
				: StatusCode(StatusCodes.Status201Created, dbDailyMealPlan);
		}

		[HttpPut("update/{id:int}")]
		public async Task<IActionResult> UpdateDailyMealPlan(int id, DailyMealPlan dailyMealPlanDto)
		{
			if (id != dailyMealPlanDto.Id) return BadRequest(dailyMealPlanDto);

			var dbDailyMealPlan = await _dailyMealPlanService.UpdateDailyMealPlanAsync(dailyMealPlanDto);

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
