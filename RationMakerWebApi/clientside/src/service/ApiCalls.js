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
    return response.ok;
  } catch {
    throw new Error("Could not delete item.");
  }
};

export const createProduct = async (product) => {
  try {
    console.log(product);
    const response = await fetch("https://localhost:7193/Product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return response.ok;
  } catch (error) {
    throw new Error("Could not add item.");
  }
};
