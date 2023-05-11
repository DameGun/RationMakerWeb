using RationMakerWebApi.DataLayer.Models;

namespace RationMakerWebApi.DataLayer.Interfaces
{
	public interface IUserService
	{
		Task<User?> CreateUserAsync(User user);
		Task<User?> GetByEmailAsync(string email);
		Task<User?> GetByIdAsync(int id);
	}
}
