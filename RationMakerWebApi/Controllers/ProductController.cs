using Microsoft.AspNetCore.Mvc;
using RationMakerWebApi.DataLayer.Interfaces;
using RationMakerWebApi.DataLayer.Models;

namespace RationMakerWebApi.Controllers;

[Route("[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        var products = await _productService.GetProductsAsync();

        return products == null ? StatusCode(StatusCodes.Status204NoContent, "No products found") : StatusCode(StatusCodes.Status200OK, products);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetProductById(int id)
    {
        var product = await _productService.GetProductAsync(id);

        return product == null ? StatusCode(StatusCodes.Status204NoContent, "No product found by id") : StatusCode(StatusCodes.Status200OK, product);
    }

    [HttpGet("searchbar/{keyword}")]
    public async Task<IActionResult> SearchProducts(string keyword)
    {
        var products = await _productService.SearchProducts(keyword) ?? await _productService.GetProductsAsync();

        return StatusCode(StatusCodes.Status200OK, products);
    }

    [HttpPost]
    public async Task<IActionResult> AddProduct(Product product)
    {
        var dbProduct = await _productService.AddProductAsync(product);

        return dbProduct == null 
            ? StatusCode(StatusCodes.Status500InternalServerError, $"{product.Name} could not be added.")
            : CreatedAtAction("GetProductById", new { id = product.Id }, product);
    }

    [HttpPut("update/{id:int}")]
    public async Task<IActionResult> UpdateProduct(int id, Product product)
    {
        if (id != product.Id) return BadRequest();

        var dbProduct = await _productService.UpdateProductAsync(product);

        return dbProduct == null
            ? StatusCode(StatusCodes.Status500InternalServerError, $"{product.Name} could not be updated.")
            : NoContent();
    }

    [HttpDelete("delete/{id:int}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await _productService.GetProductAsync(id);
        var status = false;
        var message = string.Empty;
        if (product != null)
        {
            (status, message) = await _productService.DeleteProductAsync(product);
        }

        return status == false
            ? StatusCode(StatusCodes.Status500InternalServerError, message)
            : StatusCode(StatusCodes.Status200OK, product);
    }
}