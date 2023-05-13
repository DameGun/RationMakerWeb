using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace RationMakerWebApi.DataLayer
{
	public class AuthOptions
	{
		public const string ISSUER = "RationMakerServer";
		public const string AUDIENCE = "RationMakerClient";
		public const string KEY = "RationMaker_Application_Auth_Secure_Key";  
		public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
			new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
	}
}
