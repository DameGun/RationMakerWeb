using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using RationMakerWebApi.DataLayer;
using RationMakerWebApi.DataLayer.Interfaces;
using RationMakerWebApi.DataLayer.Services;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuring CORS policy
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
	options.AddPolicy(name: MyAllowSpecificOrigins,
					  policy =>
					  {
						  policy.WithOrigins("http://localhost:3000")
						  .AllowAnyHeader()
						  .AllowAnyMethod()
						  .AllowCredentials();
					  });
});

// Dependency Injections
builder.Services.AddTransient<IProductService, ProductService>();
builder.Services.AddTransient<ICategoryService, CategoryService>();
builder.Services.AddTransient<IMealTimeService,  MealTimeService>();
builder.Services.AddTransient<IDailyMealPlan, DailyMealPlanService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<JwtService>();

// Database connection region
var connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connection));

builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

// Authorization and authentication configuring
builder.Services.AddAuthorization();
//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//	.AddJwtBearer(options =>
//	{
//		options.TokenValidationParameters = new TokenValidationParameters
//		{
//			ValidateIssuer = true,
//			ValidIssuer = AuthOptions.ISSUER,
//			ValidateAudience = true,
//			ValidAudience = AuthOptions.AUDIENCE,
//			ValidateLifetime = true,
//			IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
//			ValidateIssuerSigningKey = true,
//		};
//	});

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();


// Adding xml data to database
//using (var scope = app.Services.CreateScope())
//{
//    var services = scope.ServiceProvider;

//    DataInitializer.SetData(services);
//}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.MapControllers();

app.UseCors(MyAllowSpecificOrigins);

app.Run();