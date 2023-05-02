import {getCategories, getProducts} from "../service/ApiCalls";
import SearchBar from "./SearchBar";
import {ButtonGroup, Col, Row} from "reactstrap";
import CreateUpdateActions from "./CreateUpdateActions";
import CategoryButtons from "./CategoryButtons";
import ListProducts from "./ListProducts";
import React, {Component} from "react";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            filteredProducts: [],
            categories: [],
            selectedCategory: ''
        }
        
        this.onSearch = this.onSearch.bind(this);
        this.onSelectCategory = this.onSelectCategory.bind(this);
    }    
    
    componentDidMount = () => {
        getProducts()
            .then(data => {
                this.setState({
                    products: data,
                    filteredProducts: data
                } /*() => {
                    console.log(this.state.products)
                }*/)
            })
        getCategories()
            .then(data => {
                this.setState({
                    categories: data
                })
            })
    }
    
    onSelectCategory(category) {
        if(category === '') {
            this.setState({
                selectedCategory: category,
                filteredProducts: this.state.products
            })
        }
        else {
            this.setState({
                selectedCategory: category,
                filteredProducts: this.state.products.filter(product =>
                    product.category.name.toLowerCase().includes(category.toLowerCase()))
            }) 
        }
    }
    
    onSearch(searchTerm) {
        console.log(searchTerm)
        console.log("category: ", this.state.selectedCategory)
        let filteredProducts = [];
        if(this.state.selectedCategory === '') {
            filteredProducts = searchTerm
                ? this.state.products.filter(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                : this.state.products;
        }
        else {
            filteredProducts = this.state.products.filter(product =>
                product.category.name === this.state.selectedCategory
                &&
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        this.setState({filteredProducts})
    }
    
    render() {
        return (
            <Row>
                <SearchBar onSearch={this.onSearch}/>
                <Col lg={2} className="my-3">
                    <Row>
                        <CreateUpdateActions categories={this.state.categories} actionType="create"/>
                        <ButtonGroup vertical className="my-2 sticky-top">
                            <CategoryButtons categories={this.state.categories} onSelect={this.onSelectCategory}/>
                        </ButtonGroup>
                    </Row>
                </Col>
                <Col lg={10} className="pt-3">
                    <ListProducts products={this.state.filteredProducts} categories={this.state.categories}/>
                </Col>
            </Row>
        )
    }
}

export default Products;