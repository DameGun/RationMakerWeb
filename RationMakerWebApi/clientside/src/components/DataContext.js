// @ts-nocheck
import { createContext, useContext, useReducer } from "react";

const ProductsContext = createContext(null);

const CategoriesContext = createContext(null);

const ProductsDispatchContext = createContext(null);

const FilteredProductsContext = createContext(null);

export function ProductsProvider({ initialProducts, categories, children }) {
  const [state, dispatch] = useReducer(productsReducer, {
    products: initialProducts,
    filteredProducts: initialProducts,
    selectedCategory: "",
  });

  function filterProducts(category) {
    let filteredProducts = [];
    if (category) {
      filteredProducts = state.products.filter(
        (product) => product.category.name === category
      );
    } else filteredProducts = initialProducts;

    dispatch({ type: "SET_FILTERED_PRODUCTS", data: filteredProducts });
    dispatch({ type: "SET_CATEGORY", data: category });
  }

  return (
    <ProductsContext.Provider value={state.products}>
      <CategoriesContext.Provider value={categories}>
        <ProductsDispatchContext.Provider value={dispatch}>
          <FilteredProductsContext.Provider value={{ state, filterProducts }}>
            {children}
          </FilteredProductsContext.Provider>
        </ProductsDispatchContext.Provider>
      </CategoriesContext.Provider>
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}

export function useCategories() {
  return useContext(CategoriesContext);
}

export function useFilteredProducts() {
  return useContext(FilteredProductsContext);
}

export function useProductsDispatch() {
  return useContext(ProductsDispatchContext);
}

function productsReducer(state, action) {
  switch (action.type) {
    case "ADD_PRODUCT": {
      return {
        ...state,
        products: [...state.products, action.item],
      };
    }
    case "UPDATE_PRODUCT": {
      return {
        ...state,
        filteredProducts: state.filteredProducts.map((product) => {
          if (product.id === action.item.id) {
            return { ...product, product: action.item };
          }
          return product;
        }),
        products: state.products.map((product) => {
          if (product.id === action.item.id) {
            product = action.item;
            return { ...product, product: action.item };
          }
          return product;
        }),
      };
    }
    case "DELETE_PRODUCT": {
      return {
        ...state,
        filteredProducts: state.filteredProducts.filter(
          (product) => product.id !== action.id
        ),
        products: state.products.filter((product) => product.id !== action.id),
      };
    }
    case "SET_FILTERED_PRODUCTS": {
      return { ...state, filteredProducts: action.data };
    }
    case "SET_CATEGORY": {
      return { ...state, selectedCategory: action.data };
    }
    case "SEARCH_PRODUCTS": {
      const regex = new RegExp(action.data, "i");
      const filteredProductsSearch = state.products.filter(
        (product) =>
          (!state.selectedCategory ||
            product.category.name === state.selectedCategory) &&
          regex.test(product.name)
      );
      return { ...state, filteredProducts: filteredProductsSearch };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
