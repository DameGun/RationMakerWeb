using Microsoft.AspNetCore.Mvc;
using RationMakerWebApiReactJS.DataLayer.Interfaces;

namespace RationMakerWebApiReactJS.Controllers;

[Route("[controller]")]
[ApiController]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoryController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    [Route("get-all")]
    public async Task<IActionResult> GetAllCategories()
    {
        var categories = await _categoryService.GetAllAsync();

        return categories == null ? StatusCode(StatusCodes.Status204NoContent, "No categories found") : StatusCode(StatusCodes.Status200OK, categories);
    }
}