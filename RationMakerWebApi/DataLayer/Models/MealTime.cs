namespace RationMakerWebApi.DataLayer.Models
{
	public class MealTime
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public List<Product>? Meal { get; set; }
		public DailyMealPlan? Plan { get; set; }
		public int DailyMealPlanId { get; set; }
		public double GetCalories()
		{
			double calories = 0;
			foreach (Product product in Meal) calories += product.Calories;
			return calories;
		}

		public bool AddIfNotExists(Product product)
		{
			if (!Meal.Contains(product))
			{
				Meal.Add(product);
				return true;
			}
			return false;
		}

		public void AddOrEditProductsToMeal(List<Product> products)
		{
			if(Meal.Count > 0) foreach (Product product in Meal) AddIfNotExists(product);
			else Meal.AddRange(products);
		}
	}
}
