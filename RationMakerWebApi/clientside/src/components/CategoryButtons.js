// @ts-nocheck
import { Button } from "reactstrap";
import { useState } from "react";
import { useCategories, useFilteredProducts } from "./DataContext";

export default function CategoryButtons() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = useCategories();
  const context = useFilteredProducts();

  function handleCategoryChange(event) {
    event.preventDefault();
    setSelectedCategory(event.target.value);
    context.filterProducts(event.target.value);
  }

  return (
    <>
      <Button value="" onClick={handleCategoryChange}>
        Все продукты
      </Button>
      {categories.map((category) => {
        return (
          <Button
            key={category.id}
            id={category.id}
            value={category.name}
            size="sm"
            className={
              selectedCategory === category.name ? "active" : undefined
            }
            onClick={handleCategoryChange}
          >
            {category.name}
          </Button>
        );
      })}
    </>
  );
}
