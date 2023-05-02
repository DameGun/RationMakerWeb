using IntitialDatabase;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RationMakerWebApi.DataLayer.Models;
using RationMakerWebApi.Miscellaneous;
using System;
using System.IO;
using System.Xml.Serialization;


using (var context = new ApplicationDbContext()) 
{
	string filePath = "FoodProducts.xml";
	string path = Path.Combine(Environment.CurrentDirectory, @"Miscellaneous\", filePath);

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
