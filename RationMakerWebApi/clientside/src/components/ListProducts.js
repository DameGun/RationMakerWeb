import { Container, Table } from "reactstrap";
import ModalDelete from "./modals/ModalDelete";
import React from "react";
import { useFilteredProducts } from "./DataContext";

export default function ListProducts() {
  const context = useFilteredProducts();
  function renderProductsData(results) {
    return (
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
    );
  }

  const results = context.state.filteredProducts.map((product) => (
    <tr key={product.id}>
      <td>{product.name}</td>
      <td>{product.gramms}</td>
      <td>{product.protein}</td>
      <td>{product.fats}</td>
      <td>{product.carbs}</td>
      <td>{product.calories}</td>
      <td>{product.category.name}</td>
      <td>
        <Container className="d-flex">
          {/* <CreateUpdateActions categories={categories} actionType="update" product={product}/>*/}
          <ModalDelete product={product} />
        </Container>
      </td>
    </tr>
  ));

  const content = results?.length ? (
    renderProductsData(results)
  ) : (
    <article>
      <p>No Matching Products</p>
    </article>
  );

  return <main>{content}</main>;
}
