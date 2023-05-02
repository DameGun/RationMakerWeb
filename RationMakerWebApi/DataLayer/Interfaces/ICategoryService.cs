using RationMakerWebApi.DataLayer.Models;

namespace RationMakerWebApi.DataLayer.Interfaces;

public interface ICategoryService
{
    Task<IEnumerable<Category>?> GetAllAsync();
}