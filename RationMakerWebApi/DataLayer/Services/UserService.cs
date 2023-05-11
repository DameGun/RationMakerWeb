using Microsoft.EntityFrameworkCore;
using RationMakerWebApi.DataLayer.Interfaces;
using RationMakerWebApi.DataLayer.Models;

namespace RationMakerWebApi.DataLayer.Services
{
	public class UserService : IUserService
	{
		private readonly ApplicationDbContext _context;

		public UserService(ApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<User?> CreateUserAsync(User user)
		{
			try
			{
				await _context.Users.AddAsync(user);
				await _context.SaveChangesAsync();
				return await _context.Users.FindAsync(user.Id);
			}
			catch (Exception ex)
			{
				return null;
			}
		}

		public async Task<User?> GetByEmailAsync(string email)
		{
			try
			{
				return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
			}
			catch (Exception ex)
			{
				return null;
			}
		}

		public async Task<User?> GetByIdAsync(int id)
		{
			try
			{
				return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
			}
			catch (Exception ex)
			{
				return null;
			}
		}
	}
}
