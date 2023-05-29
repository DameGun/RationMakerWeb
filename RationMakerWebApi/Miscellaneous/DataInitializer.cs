using System.Xml.Serialization;
using Microsoft.EntityFrameworkCore;
using RationMakerWebApi.DataLayer;
using RationMakerWebApi.DataLayer.Models;

namespace RationMakerWebApi.Miscellaneous;

public static class DataInitializer
{
    private static readonly string filePath = "FoodProducts.xml";
    private static string path = Path.Combine(Environment.CurrentDirectory, @"Miscellaneous\", filePath);

    public static void SetData(IServiceProvider serviceProvider)
    {
        using (var context =
               new ApplicationDbContext(serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
        {
            Console.WriteLine(context.Database.GetConnectionString());
            if (context.Products.Any() || context.Categories.Any()) return;

            var data = new List<Category>();
            var sl = new XmlSerializer(typeof(Db));

            using (var fs = new FileStream(path, FileMode.OpenOrCreate))
            {
                var rawData = new Db();
                rawData = sl.Deserialize(fs) as Db;

                data = rawData.Categories;

                if (data.Count != 0)
                {
                    context.AddRange(data);
                    context.SaveChanges();
                }
            }
        }
    }
}