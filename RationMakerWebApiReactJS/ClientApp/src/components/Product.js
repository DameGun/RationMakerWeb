import React from "react";
import ModalDelete from "./ModalDelete";
import {Container} from "reactstrap";
import ApiAccessor from "./ApiAccessor";

const Product = ({ product, showCategories }) => {
    return (
            <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.gramms}</td>
                <td>{product.protein}</td>
                <td>{product.fats}</td>
                <td>{product.carbs}</td>
                <td>{product.calories}</td>
                {
                    showCategories ? <td>{product.category.name}</td> : <></>
                }
                <td>
                    <Container className="d-flex">
                        <ModalDelete product={product}/>
                        {/*<ApiAccessor product={product}/>*/}
                    </Container>
                </td>
            </tr>
    )
}
export default Product;