import React from "react";
import { ButtonGroup, Col, Container, Row } from "reactstrap";
import { getCategories, getProducts } from "../service/ApiCalls";
import { useApiCallOnMount } from "../service/useApiCallOnMount";
import ApiStateHandler from "../service/ApiStateHandler";
import SearchBar from "../components/SearchBar";
import CategoryButtons from "../components/CategoryButtons";
import ListProducts from "../components/ListProducts";
import { ProductsProvider } from "../components/DataContext";
import { CreateProduct } from "../components/modals/CRUD";

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
                <CreateProduct />
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
