export const getProducts = async () => {
  try {
    const response = await fetch("http://localhost:5117/product");
    return response.json();
  } catch {
    throw new Error("Could not fetch the products.");
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch("http://localhost:5117/category/get-all");
    return response.json();
  } catch {
    throw new Error("Could not fetch categories.");
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`http://localhost:5117/product/delete/${id}`, {
      method: "DELETE",
    });
    return response;
  } catch {
    throw new Error("Could not delete item.");
  }
};

export const createProduct = async (product) => {
  try {
    const response = await fetch("http://localhost:5117/Product", {
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
      `http://localhost:5117/Product/Update/${product.id}`,
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

export const registerUser = async (user) => {
  try {
    const response = await fetch("http://localhost:5117/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return response;
  } catch (error) {
    throw new Error("Could not register user");
  }
};

export const loginUser = async (user) => {
  try {
    const response = await fetch("http://localhost:5117/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(user),
    });
    return response;
  } catch (error) {
    throw new Error("Could not login");
  }
};

export const getUser = async () => {
  try {
    const response = await fetch("http://localhost:5117/auth/user", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return response;
  } catch (error) {
    throw new Error("Could not fetch user");
  }
};

export const logoutUser = async () => {
  try {
    const response = await fetch("http://localhost:5117/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return response;
  } catch (error) {
    throw new Error("Could not logout");
  }
};

export const refreshToken = async () => {
  try {
    const response = await fetch("http://localhost:5117/auth/refresh", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return response;
  } catch (error) {
    throw new Error("Could not logout");
  }
};
