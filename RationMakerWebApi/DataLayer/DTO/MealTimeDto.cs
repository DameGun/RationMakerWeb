namespace RationMakerWebApi.DataLayer.DTO
{
	public class MealTimeDto
	{
		public string Name { get; set; }
		public int[]? ProductsId { get; set; }
		public int DailyMealPlanId { get; set; }
	}
}
