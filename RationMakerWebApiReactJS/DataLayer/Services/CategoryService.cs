using Microsoft.EntityFrameworkCore;
using RationMakerWebApiReactJS.DataLayer.Interfaces;
using RationMakerWebApiReactJS.DataLayer.Models;

namespace RationMakerWebApiReactJS.DataLayer.Services;

public class CategoryService : ICategoryService
{
    private readonly ApplicationDbContext _context;

    public CategoryService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Category>?> GetAllAsync()
    {
        try
        {
            return await _context.Categories.ToListAsync();
        }
        catch (Exception ex)
        {
            return null;
        }
    }
        
}