﻿using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace RationMakerWebApi.DataLayer.Services
{
	public class JwtService
	{
		private string secureKey = "RationMaker Application Auth Secure Key";

		public string Generate(int id)
		{
			var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey));
			var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
			var header = new JwtHeader(credentials);

			// 1 day long 
			var payload = new JwtPayload(id.ToString(), null, null, null, DateTime.Today.AddDays(1));
			var securityToken = new JwtSecurityToken(header, payload);


			return new JwtSecurityTokenHandler().WriteToken(securityToken);
		}

		public JwtSecurityToken Verify(string jwt)
		{
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes(secureKey);
			tokenHandler.ValidateToken(jwt, new TokenValidationParameters
			{
				IssuerSigningKey = new SymmetricSecurityKey(key),
				ValidateIssuerSigningKey = true,
				ValidateIssuer = false,
				ValidateAudience = false
			}, out SecurityToken validatedToken);

			return (JwtSecurityToken)validatedToken;
		}
	}
}