using Azure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Hosting;
using RationMakerWebApi.DataLayer.Models;

namespace RationMakerWebApi.DataLayer;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<MealTime> MealTime { get; set; }
    public DbSet<DailyMealPlan> DailyMealPlan { get; set; }
    public DbSet<MealTimeProduct> MealTimeProducts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    { 
        modelBuilder.Entity<Product>()
            .HasOne(x => x.Category)
            .WithMany(x => x.Products)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(e => e.Email).IsUnique();
        });

        modelBuilder.Entity<User>()
            .Property(u => u.DailyActivity)
            .HasConversion(new EnumToStringConverter<Activity>());

        modelBuilder.Entity<DailyMealPlan>()
            .HasOne(x => x.AppUser)
            .WithMany(x => x.DailyMealPlans)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<DailyMealPlan>()
            .HasMany(x => x.MealTimes)
            .WithOne(x => x.Plan)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<MealTime>()
            .HasMany(m => m.Meal)
            .WithMany().
            UsingEntity<MealTimeProduct>();
    }
}