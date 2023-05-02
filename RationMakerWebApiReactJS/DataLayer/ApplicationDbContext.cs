using Microsoft.EntityFrameworkCore;
using RationMakerWebApiReactJS.DataLayer.Models;

namespace RationMakerWebApiReactJS.DataLayer;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>()
            .HasOne(x => x.Category)
            .WithMany(x => x.Products)
            .OnDelete(DeleteBehavior.Cascade);
    }
}