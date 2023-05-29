import React from "react";
import { Button, ButtonGroup, Col, Container, Row } from "reactstrap";
import { createProduct, getCategories, getProducts } from "../service/ApiCalls";
import { useApiCallOnMount } from "../service/useApiCallOnMount";
import ApiStateHandler from "../service/ApiStateHandler";
import SearchBar from "../components/SearchBar";
import CategoryButtons from "../components/CategoryButtons";
import ListProducts from "../components/ListProducts";
import { ProductsProvider } from "../context/DataContext";
import { ModalWrapper } from "../components/modals/ModalWrapper";
import { GrAdd } from "react-icons/gr";
import CreateUpdateProductFunc from "../components/modals/CreateUpdateProductFunc";

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
                <ModalWrapper
                  modalHeader={"Create product"}
                  service={createProduct}
                  dispatchType={"product"}
                  dispatchName={"ADD_PRODUCT"}
                  button={
                    <Button color="black" outline={true} block={true}>
                      <GrAdd />
                    </Button>
                  }
                >
                  <CreateUpdateProductFunc product={""} />
                </ModalWrapper>
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
