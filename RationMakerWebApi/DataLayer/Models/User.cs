using System.Text.Json.Serialization;
using RationMakerWebApi.DataLayer.Models;

namespace RationMakerWebApi.DataLayer.Models
{
	public enum Activity
	{
		Low,
		Normal,
		Average,
		High
	}

	public class User
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Email { get; set; }

		[JsonIgnore]
		public string Password { get; set; }
		public double Weight { get; set; }
		public double Height { get; set; }
		public int Age { get; set; }
		public Activity DailyActivity { get; set; }

		public List<DailyMealPlan>? DailyMealPlans { get; set; }
	}
}
