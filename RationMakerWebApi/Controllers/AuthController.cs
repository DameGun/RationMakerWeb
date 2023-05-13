using Microsoft.AspNetCore.Mvc;
using RationMakerWebApi.DataLayer.DTO;
using RationMakerWebApi.DataLayer.Interfaces;
using RationMakerWebApi.DataLayer.Models;
using RationMakerWebApi.DataLayer.Services;
using Microsoft.IdentityModel.Tokens;


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

		[HttpGet("refresh")]
		public async Task<IActionResult> RefreshToken()
		{
			var cookies = Request.Cookies;
			if (!cookies.ContainsKey("RefreshToken")) return StatusCode(StatusCodes.Status401Unauthorized);
			var refreshToken = cookies["RefreshToken"];

			var token = _jwtService.Verify(refreshToken);
			if (!token.Item1) return StatusCode(StatusCodes.Status403Forbidden, token.Item2);

			string userEmail = token.Item2;
			var dbUser = await _userService.GetByEmailAsync(userEmail);

			if (dbUser == null) return StatusCode(StatusCodes.Status403Forbidden);

			var accessToken = _jwtService.Generate(dbUser.Email, "access", DateTime.UtcNow.AddMinutes(5));

			return new JsonResult(new { accessToken, dbUser.Email });

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

			var dbResponse = await _userService.CreateUserAsync(dbUser);
			if (dbResponse == null) return StatusCode(StatusCodes.Status409Conflict);

			return StatusCode(StatusCodes.Status201Created, new { email = dbResponse.Email });
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login(LoginDto user)
		{
			var dbUser = await _userService.GetByEmailAsync(user.Email);

			if (dbUser == null) return BadRequest(new { Error = "Invalid Credentials" });

			if (!BCrypt.Net.BCrypt.Verify(user.Password, dbUser.Password)) return BadRequest(new { Error = "Invalid Credentials" });

			var refreshToken = _jwtService.Generate(dbUser.Email, "refresh", DateTime.UtcNow.AddMinutes(10));

			var accessToken = _jwtService.Generate(dbUser.Email, "access", DateTime.UtcNow.AddMinutes(5));

			Response.Cookies.Append("RefreshToken", refreshToken, new CookieOptions
			{
				HttpOnly = true,
				MaxAge = new TimeSpan(0, 10, 0)
			});

			return StatusCode(StatusCodes.Status200OK, new { accessToken });
		}

		//[HttpGet("user")]
		//public async Task<IActionResult> GetUser()
		//{
		//	try
		//	{
		//		var jwt = Request.Cookies["RefreshToken"];

		//		var token = _jwtService.Verify(jwt);

		//		int userId = int.Parse(token.Item2);

		//		var dbUser = await _userService.GetByIdAsync(userId);

		//		return StatusCode(StatusCodes.Status200OK, dbUser);
		//	}
		//	catch (Exception ex)
		//	{
		//		return Unauthorized();
		//	}
		//}

		[HttpPost("logout")]
		public IActionResult Logout()
		{
			var cookies = Request.Cookies;
			if (!cookies.ContainsKey("RefreshToken")) return StatusCode(StatusCodes.Status204NoContent);
			var refreshToken = cookies["RefreshToken"];

			if (refreshToken.IsNullOrEmpty()) return StatusCode(StatusCodes.Status204NoContent);

			Response.Cookies.Delete("RefreshToken");

			return StatusCode(StatusCodes.Status204NoContent);
		}
	}
}
