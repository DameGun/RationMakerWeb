import {
  ButtonGroup,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
} from "reactstrap";
import ModalDelete from "./modals/ModalDelete";
import React, { useState } from "react";
import { useFilteredProducts } from "./DataContext";
import { UpdateProduct } from "./modals/CRUD";

export default function ListProducts() {
  const context = useFilteredProducts();

  const pageSize = 25;

  const [activePage, setActivePage] = useState(1);

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
        <ButtonGroup>
          <UpdateProduct product={product} />
          <ModalDelete product={product} />
        </ButtonGroup>
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
