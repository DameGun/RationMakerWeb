namespace RationMakerWebApi.DataLayer.Models
{
	public class DailyMealPlan
	{
		public int Id { get; set; }
		public string Name { get; set; }

		public User? AppUser { get; set; }
		public int UserId { get; set; }
		public List<MealTime>? MealTimes { get; set; }

		public double GetBMR() => 447.593 + 9.247 * AppUser.Weight + 3.098 * AppUser.Height - 4.330 * AppUser.Age;

		public double GetARM() => AppUser.DailyActivity switch
		{
			Activity.Low => 1.2,
			Activity.Normal => 1.375,
			Activity.Average => 1.55,
			Activity.High => 1.725,
			_ => throw new NotImplementedException()
		};

		public double GetDailyCaloriesRate() => GetARM() + GetBMR();

		public void AddOrEditMealTime(MealTime userMealTime)
		{
			MealTime? mealTimeBuff = MealTimes.FirstOrDefault(m => m.Name == userMealTime.Name);
			if (mealTimeBuff == null) throw new NotImplementedException();
			mealTimeBuff = userMealTime;
		}

		public double GetMealPlanCalories()
		{
			double calories = 0;
			foreach (MealTime mealTime in MealTimes) calories = mealTime.GetCalories();
			return calories;
		}
	}
}
