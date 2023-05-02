using System.Xml.Serialization;

namespace RationMakerWebApiReactJS.DataLayer.Models;

public class Category
{
    public int Id { get; set; }

    [XmlAttribute("name")] public string Name { get; set; }

    [XmlElement("Product")] public List<Product>? Products { get; set; }
}