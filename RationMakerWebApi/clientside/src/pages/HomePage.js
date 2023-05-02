import React from "react";
import { ButtonGroup, Col, Container, Row } from "reactstrap";
import { getCategories, getProducts } from "../service/ApiCalls";
import useApiCallOnMount from "../service/useApiCallOnMount";
import ApiStateHandler from "../service/ApiStateHandler";
import SearchBar from "../components/SearchBar";
import CategoryButtons from "../components/CategoryButtons";
import ListProducts from "../components/ListProducts";
import { ProductsProvider } from "../components/DataContext";

/*const handleSearch = (searchTerm) => {
    setFilteredProducts(
        products.filter(
            (product) =>
                (!selectedCategory || product.category.name.toLowerCase() === selectedCategory.toLowerCase()) 
                &&
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
};

const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setFilteredProducts(
        products.filter(
            (product) =>
                !category || product.category.name.toLowerCase() === category.toLowerCase()
        )
    );
};*/

export default function HomePage() {
  const [loadingProducts, products, errorProducts] =
    useApiCallOnMount(getProducts);
  const [loadingCategories, categories, errorCategories] =
    useApiCallOnMount(getCategories);

  return (
    <Container>
      <ApiStateHandler loading={loadingCategories} error={errorCategories}>
        <ApiStateHandler loading={loadingProducts} error={errorProducts}>
          <ProductsProvider initialProducts={products} categories={categories}>
            <Row>
              <SearchBar />
              <Col lg={2} className="my-3">
                <Row>
                  <ButtonGroup vertical className="my-2 sticky-top">
                    <CategoryButtons />
                  </ButtonGroup>
                </Row>
              </Col>
              <Col lg={10} className="pt-3">
                <ListProducts />
              </Col>
            </Row>
          </ProductsProvider>
        </ApiStateHandler>
      </ApiStateHandler>
    </Container>
  );
}