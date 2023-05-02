import ProductsSearch from "../pages/HomePage";

export const getProducts = async () => {
    try {
        const response = await fetch('https://localhost:7193/product');
        return response.json();
    }
    catch {
        throw new Error('could not fetch the products');
    }
}

export const getCategories = async () => {
    try {
        const response = await fetch('https://localhost:7193/category/get-all');
        return response.json();
    }
    catch {
        throw new Error('could not fetch categories');
    }
}

export const deleteProduct = async (id) => {
    try {
        return await fetch(
            `https://localhost:7193/product/delete/${id}`, {
                "method": "DELETE"});
    }
    catch {
        throw new Error('could not delete item')
    }
}