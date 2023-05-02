using Microsoft.EntityFrameworkCore;
using RationMakerWebApiReactJS.DataLayer.Interfaces;
using RationMakerWebApiReactJS.DataLayer.Models;

namespace RationMakerWebApiReactJS.DataLayer.Services;

public class ProductService : IProductService
{
    private readonly ApplicationDbContext _context;

    public ProductService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Product>?> GetProductsAsync()
    {
        try
        {
            return await _context.Products.Include(c => c.Category).ToListAsync();
        }
        catch (Exception ex)
        {
            return null;
        }
    }

    public async Task<Product?> GetProductAsync(int id)
    {
        try
        {
            return await _context.Products.Include(c => c.Category).FirstOrDefaultAsync(i => i.Id == id);
        }
        catch (Exception ex)
        {
            return null;
        }
    }

    public async Task<IEnumerable<Product>?> SearchProducts(string keyword)
    {
        try
        {
            return await _context.Products.Include(c => c.Category)
                .Where(p =>
                    (p.Name.ToLower().Contains(keyword.ToLower())) ||
                    ((p.Category != null) && (p.Category.Name.ToLower().Contains(keyword.ToLower())))
                ).ToListAsync();
        }
        catch
        {
            return null;
        }
    }

    public async Task<Product?> AddProductAsync(Product product)
    {
        try
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return await _context.Products.FindAsync(product.Id);
        }
        catch (Exception ex)
        {
            return null;
        }
    }

    public async Task<Product?> UpdateProductAsync(Product product)
    {
        try
        {
            _context.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return product;
        }
        catch (Exception ex)
        {
            return null;
        }
    }

    public async Task<(bool, string)> DeleteProductAsync(Product product)
    {
        try
        {
            var dbProduct = await _context.Products.FindAsync(product.Id);

            if (dbProduct == null) return (false, "Product could not be found");

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return (true, "Product deleted");
        }
        catch (Exception ex)
        {
            return (false, $"An error occured. Error Message: {ex.Message}");
        }
    }
}