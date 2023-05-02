
const ProductsFilter = ({ setResults, currentCategory, products, value }) => {
    
    function productsWithCategories(currentCategory) {
        return products.filter(product => {
            return product.category.name.toLowerCase().includes(currentCategory.toLowerCase())
        })
    }
    
    function productsByValue(buffProducts, value) {
        return buffProducts.filter(product => {
            return product.name.toLowerCase().includes(value.toLowerCase())
        })
    }
    
    if(value) {
        if(currentCategory) {
            const buff = productsWithCategories(currentCategory);
            const results = productsByValue(buff, value);
            setResults(results);
        }
        else {
            setResults(productsByValue(products, value));
        }
    }
    else {
        currentCategory ? setResults(productsWithCategories(currentCategory)) : setResults(products);
    }
}
export default ProductsFilter;