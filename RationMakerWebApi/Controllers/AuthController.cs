using Microsoft.AspNetCore.Mvc;
using RationMakerWebApi.DataLayer.DTO;
using RationMakerWebApi.DataLayer.Interfaces;
using RationMakerWebApi.DataLayer.Models;
using RationMakerWebApi.DataLayer.Services;

namespace RationMakerWebApi.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly IUserService _userService;
		private readonly JwtService _jwtService;

		public AuthController(IUserService userService, JwtService jwtService)
		{
			_userService = userService;
			_jwtService = jwtService;
		}

		[HttpPost("register")]
		public async Task<IActionResult> Register(RegisterDto user)
		{
			var dbUser = new User
			{
				Name = user.Name,
				Email = user.Email,
				Password = BCrypt.Net.BCrypt.HashPassword(user.Password)
			};
			 
			return Created("success", await _userService.CreateUserAsync(dbUser));
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login(LoginDto user)
		{
			var dbUser = await _userService.GetByEmailAsync(user.Email);

			if (dbUser == null) return BadRequest(new { message = "Invalid Credentials" });

			if (!BCrypt.Net.BCrypt.Verify(user.Password, dbUser.Password)) return BadRequest(new { message = "Invalid Credentials" });

			var jwt = _jwtService.Generate(dbUser.Id);

			Response.Cookies.Append("jwt", jwt, new CookieOptions
			{
				HttpOnly = true
			});

			return StatusCode(StatusCodes.Status200OK);
		}

		[HttpGet("user")]
		public async Task<IActionResult> GetUser()
		{
			try
			{
				var jwt = Request.Cookies["jwt"];

				var token = _jwtService.Verify(jwt);

				int userId = int.Parse(token.Issuer);

				var dbUser = await _userService.GetByIdAsync(userId);

				return StatusCode(StatusCodes.Status200OK, dbUser);
			}
			catch (Exception ex)
			{
				return Unauthorized();
			}
		}

		[HttpPost("logout")]
		public async Task<IActionResult> Logout()
		{
			Response.Cookies.Delete("jwt");

			return StatusCode(StatusCodes.Status200OK);
		}
	}
}
