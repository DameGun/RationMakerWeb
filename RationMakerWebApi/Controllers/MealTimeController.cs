using Microsoft.AspNetCore.Mvc;
using RationMakerWebApi.DataLayer.DTO;
using RationMakerWebApi.DataLayer.Interfaces;
using RationMakerWebApi.DataLayer.Models;

namespace RationMakerWebApi.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class MealTimeController : ControllerBase
	{
		private readonly IMealTimeService _mealTimeService;
		private readonly IProductService _productService;

		public MealTimeController(IMealTimeService mealTimeService, IProductService productService)
		{
			_mealTimeService = mealTimeService;
			_productService = productService;
		}

		[HttpGet("{id:int}")]
		public async Task<IActionResult> GetMealTime(int id)
		{
			var mealtime = await _mealTimeService.GetMealTimeAsync(id);
			return mealtime == null ? StatusCode(StatusCodes.Status204NoContent) : StatusCode(StatusCodes.Status200OK, mealtime);
		}

		[HttpPost("add")]
		public async Task<IActionResult> AddMealTime(MealTimeDto mealTimeDto)
		{
			List<Product> products = new List<Product>();
			foreach (var productId in mealTimeDto.ProductsId)
			{
				var dbProduct = await _productService.GetProductAsync(productId);
				if (dbProduct != null) products.Add(dbProduct);
			}

			MealTime mealTime = new MealTime	
			{
				Name = mealTimeDto.Name,
				Meal = products,
				DailyMealPlanId = mealTimeDto.DailyMealPlanId
			};

			var dbMealTime = _mealTimeService.AddMealTimeAsync(mealTime);

			return dbMealTime == null 
				? StatusCode(StatusCodes.Status500InternalServerError, $"MealTime {mealTime.Id} could not be added.")
				: StatusCode(StatusCodes.Status201Created, dbMealTime);
		}
		
		[HttpPost("update/{id:int}")]
		public async Task<IActionResult> UpdateMealTime(int id, MealTime mealTime)
		{
			if (id != mealTime.Id) return BadRequest();

			var dbMealTime = await _mealTimeService.UpdateMealTimeAsync(mealTime);

			return dbMealTime == null
				? StatusCode(StatusCodes.Status500InternalServerError, $"{dbMealTime.Name} could not be updated.")
				: StatusCode(StatusCodes.Status200OK, dbMealTime);
		}

		[HttpDelete("delete/{id:int}")]
		public async Task<IActionResult> DeleteMealTime(int id)
		{
			var dbMealTime = await _mealTimeService.GetMealTimeAsync(id);
			var status = false;
			var message = string.Empty;

			if (dbMealTime != null)
			{
				(status, message) = await _mealTimeService.DeleteMealTimeAsync(dbMealTime);
			}

			return status == false
				? StatusCode(StatusCodes.Status500InternalServerError, message)
				: StatusCode(StatusCodes.Status200OK, dbMealTime);
		}
	}
}
