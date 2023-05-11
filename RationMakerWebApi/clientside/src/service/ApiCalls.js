export const getProducts = async () => {
  try {
    const response = await fetch("https://localhost:7193/product");
    return response.json();
  } catch {
    throw new Error("Could not fetch the products.");
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch("https://localhost:7193/category/get-all");
    return response.json();
  } catch {
    throw new Error("Could not fetch categories.");
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(
      `https://localhost:7193/product/delete/${id}`,
      {
        method: "DELETE",
      }
    );
    return response;
  } catch {
    throw new Error("Could not delete item.");
  }
};

export const createProduct = async (product) => {
  try {
    const response = await fetch("https://localhost:7193/Product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return response;
  } catch (error) {
    throw new Error("Could not add item.");
  }
};

export const updateProduct = async (product) => {
  try {
    const response = await fetch(
      `https://localhost:7193/Product/Update/${product.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      }
    );
    return response;
  } catch (error) {
    throw new Error("Could not update item");
  }
};
