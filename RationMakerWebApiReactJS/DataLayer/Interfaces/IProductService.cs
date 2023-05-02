using RationMakerWebApiReactJS.DataLayer.Models;

namespace RationMakerWebApiReactJS.DataLayer.Interfaces;

public interface IProductService
{
    Task<IEnumerable<Product>?> GetProductsAsync();
    Task<Product?> GetProductAsync(int id);
    Task<IEnumerable<Product>?> SearchProducts(string keyword);
    Task<Product?> AddProductAsync(Product product);
    Task<Product?> UpdateProductAsync(Product product);
    Task<(bool, string)> DeleteProductAsync(Product product);
}