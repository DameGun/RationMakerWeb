using RationMakerWebApiReactJS.DataLayer.Models;

namespace RationMakerWebApiReactJS.DataLayer.Interfaces;

public interface ICategoryService
{
    Task<IEnumerable<Category>?> GetAllAsync();
}