using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace RationMakerWebApi.DataLayer.Services
{
	public class JwtService
	{
		private string secureKey = "RationMaker Application Auth Secure Key";

		public string Generate(string email, string type, DateTime expirationTime)
		{
			var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey));
			var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
			var header = new JwtHeader(credentials);

			var payload = new JwtPayload(email, type, null, null, expirationTime);

			var securityToken = new JwtSecurityToken(header, payload);


			return new JwtSecurityTokenHandler().WriteToken(securityToken);
		}

		public (bool, string) Verify(string jwt)
		{
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes(secureKey);
			try
			{
				Console.WriteLine(DateTime.UtcNow);
				tokenHandler.ValidateToken(jwt, new TokenValidationParameters
				{
					IssuerSigningKey = new SymmetricSecurityKey(key),
					ValidateIssuerSigningKey = true,
					ValidateIssuer = false,
					ValidateAudience = false,
					ValidateLifetime = true,
					ClockSkew = TimeSpan.Zero
				}, out SecurityToken validatedToken);
				return (true, ((JwtSecurityToken)validatedToken).Issuer);
			}
			catch (Exception ex)
			{
				return (false, "Token validation time expired");
			}
		}
	}
}
