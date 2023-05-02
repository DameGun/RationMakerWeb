using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using RationMakerWebApi.DataLayer;
using RationMakerWebApi.DataLayer.Interfaces;
using RationMakerWebApi.DataLayer.Services;
using RationMakerWebApi.Miscellaneous;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
	options.AddPolicy(name: MyAllowSpecificOrigins,
					  policy =>
					  {
						  policy.WithOrigins("http://localhost:3000"); // add the allowed origins  
					  });
});

// Dependency Injections
builder.Services.AddTransient<IProductService, ProductService>();
builder.Services.AddTransient<ICategoryService, CategoryService>();

// Database connection region
var connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connection));

builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

var app = builder.Build();

Console.WriteLine(app.Services.CreateScope().ServiceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>());

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

app.UseAuthorization();

app.MapControllers();

app.UseCors(MyAllowSpecificOrigins);

app.Run();