import {
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
} from "reactstrap";
import React, { useEffect, useState } from "react";
import { useFilteredProducts } from "../context/DataContext";
import {
  addProductToMealTime,
  deleteProduct,
  updateProduct,
} from "../service/ApiCalls";
import { ModalWrapper } from "./modals/ModalWrapper";
import DeleteFunc from "./modals/DeleteFunc";
import { GrEdit, GrTableAdd, GrTrash } from "react-icons/gr";
import CreateUpdateProductFunc from "./modals/CreateUpdateProductFunc";
import AddToMealPlanFunc from "./modals/AddToMealPlanFunc";

export default function ListProducts() {
  const context = useFilteredProducts();

  const pageSize = 25;

  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setActivePage(1);
  }, [context.state.selectedCategory]);

  const totalPages = Math.ceil(
    context.state.filteredProducts.length / pageSize
  );

  function handlePageClick(page) {
    setActivePage(page);
  }

  const tableData = context.state.filteredProducts.slice(
    (activePage - 1) * pageSize,
    activePage * pageSize
  );

  function renderProductsData(results) {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gramms</th>
              <th>Protein</th>
              <th>Fats</th>
              <th>Carbs</th>
              <th>Calories</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{results}</tbody>
        </Table>
        <Pagination size="sm">
          <PaginationItem disabled={activePage === 1}>
            <PaginationLink
              previous
              onClick={() => handlePageClick(activePage - 1)}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem active={i + 1 === activePage} key={i}>
              <PaginationLink onClick={() => handlePageClick(i + 1)}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem disabled={activePage === totalPages}>
            <PaginationLink
              next
              onClick={() => handlePageClick(activePage + 1)}
            />
          </PaginationItem>
        </Pagination>
      </div>
    );
  }

  const results = tableData.map((product) => (
    <tr key={product.id}>
      <td>{product.name}</td>
      <td>{product.gramms}</td>
      <td>{product.protein}</td>
      <td>{product.fats}</td>
      <td>{product.carbs}</td>
      <td>{product.calories}</td>
      <td>{product.category.name}</td>
      <td>
        <div className="d-flex flex-direction-row justify-content-between">
          <ModalWrapper
            modalHeader={"Edit product"}
            service={updateProduct}
            dispatchType={"product"}
            dispatchName={"UPDATE_PRODUCT"}
            button={
              <Button size="sm" color="black" outline={true}>
                <GrEdit />
              </Button>
            }
          >
            <CreateUpdateProductFunc product={product} />
          </ModalWrapper>
          <ModalWrapper
            modalHeader={"Delete product"}
            service={deleteProduct}
            dispatchType={"product"}
            dispatchName={"DELETE_PRODUCT"}
            button={
              <Button size="sm" color="black" outline={true}>
                <GrTrash />
              </Button>
            }
          >
            <DeleteFunc data={product}></DeleteFunc>
          </ModalWrapper>
          <ModalWrapper
            modalHeader={"Add to meal plan"}
            service={addProductToMealTime}
            dispatchType={"empty"}
            dispatchName={""}
            button={
              <Button size="sm" color="black" outline={true}>
                <GrTableAdd />
              </Button>
            }
          >
            <AddToMealPlanFunc productId={product.id} />
          </ModalWrapper>
        </div>
      </td>
    </tr>
  ));

  const content = results?.length ? (
    renderProductsData(results)
  ) : (
    <div className="mt-5 d-flex align-items-center justify-content-center">
      <p>No matching products</p>
    </div>
  );

  return <main>{content}</main>;
}
