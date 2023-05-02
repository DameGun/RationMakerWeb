import Product from "./Product";
import {Table} from "reactstrap";

const ListProducts = ({products}) => {
    const showCategories = products.some(item => item.category != null);
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
                    {
                        showCategories ? <th>Category</th> : <></>
                    }
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {results}
                </tbody>
            </Table>
        );
    }
    
    const results = products.map(product => <Product key={product.id} product={product} showCategories={showCategories}/>)
    const content = results?.length ? renderProductsData(results) : <article><p>No Matching Products</p></article>

    return (
        <main>{content}</main>
    )
}

export default ListProducts;
