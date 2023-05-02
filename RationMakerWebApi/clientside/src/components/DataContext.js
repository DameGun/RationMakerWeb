import { createContext, useContext, useReducer, useState } from "react";

const ProductsContext = createContext(null);

const CategoriesContext = createContext(null);

const ProductsDispatchContext = createContext(null);

export function ProductsProvider({ initialProducts, categories, children }) {
  const [products, dispatch] = useReducer(productsReducer, initialProducts);

  return (
    <ProductsContext.Provider value={products}>
      <CategoriesContext.Provider value={categories}>
        <ProductsDispatchContext.Provider value={dispatch}>
          {children}
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

export function useProductsDispatch() {
  return useContext(ProductsDispatchContext);
}

// const handleSearch = (products, searchTerm) => {
//     return products.filter(
//         (product) =>
//             (!selectedCategory || product.category.name.toLowerCase() === selectedCategory.toLowerCase())
//             &&
//             product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     )
// };

// const handleCategorySelect = (products, category) => {
//     selectedCategory = category;

//     return products.filter(
//         (product) =>
//             !category || product.category.name.toLowerCase() === category.toLowerCase()
//     )
// };

function productsReducer(products, action) {
  switch (action.type) {
    case "deleted": {
      return products.filter((product) => product.id !== action.id);
    }
    // case "inCategory": {
    //   return handleCategorySelect(products, action.category);
    // }
    /*case 'added': {
            return fetch('product', {
                "method": "POST",
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify({
                    name: action.name,
                    gramms: action.gramms,
                    protein: action.protein,
                    fats: action.fats,
                    carbs: action.carbs,
                    calories: action.calories,
                    categoryId: action.categoryId
                })
            })
                .then((response) => response.ok)
                .then((response) => {
                    response
                        ? this.setState({actionStatus: true})
                        : console.log("Something happened!!!")
                })
                .catch(err => console.log(err));
        }*/
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
