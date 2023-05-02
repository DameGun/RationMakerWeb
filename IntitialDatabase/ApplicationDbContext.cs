using Microsoft.EntityFrameworkCore;
using RationMakerWebApi.DataLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntitialDatabase
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext() { }

		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
		{
		}

		public DbSet<Product> Products { get; set; }
		public DbSet<Category> Categories { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) 
			=> optionsBuilder.UseSqlServer("Data Source=LAPTOP-UASQ5OG7;Initial Catalog=RationMakerDB;Integrated Security=True;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Product>()
				.HasOne(x => x.Category)
				.WithMany(x => x.Products)
				.OnDelete(DeleteBehavior.Cascade);
		}
	}
}
