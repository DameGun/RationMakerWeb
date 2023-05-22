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

export const getPlans = async (email) => {
  try {
    const response = await fetch(
      "http://localhost:5117/dailymealplan/getallplans?" +
        new URLSearchParams({ email: email }),
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.json();
  } catch (error) {
    throw new Error("Could not get user meal plans");
  }
};

export const addPlan = async (plan) => {
  try {
    const response = await fetch("http://localhost:5117/dailymealplan/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plan),
    });
    return response;
  } catch (error) {
    throw new Error("Could not add meal plan");
  }
};

export const addMealMealTime = async (mealTime) => {
  try {
    const response = await fetch("http://localhost:5117/mealtime/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mealTime),
    });
    return response;
  } catch (error) {
    throw new Error("Could not add meal time");
  }
};

export const addProductToMealTime = async ({ mealTimeId, productId }) => {
  try {
    const response = await fetch(
      `http://localhost:5117/mealtime/addProductTo/${mealTimeId}?` +
        new URLSearchParams({ productId: productId }),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  } catch (error) {
    throw new Error("Could not add product to meal time");
  }
};
