using System.Xml.Serialization;
using RationMakerWebApi.DataLayer.Models;

namespace RationMakerWebApi.Miscellaneous;

[XmlRoot("Db")]
public class Db
{
    [XmlElement("Category")] public List<Category> Categories { get; set; }
}