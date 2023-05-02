import SearchBar from "./components/SearchBar";
import React, {useEffect, useState} from "react";
import {ButtonGroup, Col, Container, Row} from "reactstrap";
import CategoryButtons from "./components/CategoryButtons";
import ApiAccessor from "./components/ApiAccessor";
import ListProducts from "./components/GetProducts";

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [results, setResults] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("");
    
    /*useEffect(() => {
        GetItems()
            .then(response => {
                setProducts(response);
                setResults(response);
            })
    },[setProducts]);

    useEffect(() => {
        GetCategories()
            .then(response => {
                setCategories(response);
            })
    },[setCategories]);*/
    
    /*useEffect(() => {
        fetch(`category/get-all`)
            .then(async response =>
                await response.json())
            .then(json => {
                    setCategories(json);
                }
            );
    },[setCategories])
    
    useEffect(() => {
        fetch(`product`)
            .then(async response => await response.json())
            .then(json => {
                setProducts(json);
                setResults(json);
            })
    }, [setProducts])*/
    
    return(
        <Container>
            
            <Row>
                <SearchBar setResults={setResults} categories={categories} products={products} currentCategory={currentCategory}/>
                <Col lg={2} className="my-3">
                    <Row>
                        <ApiAccessor categories={categories}/>
                    </Row>
                    <Row>
                        <ButtonGroup vertical className="my-2 sticky-top">
                            <CategoryButtons setResults={setResults} categories={categories} products={products} setCurrentCategory={setCurrentCategory}/>
                        </ButtonGroup>
                    </Row>
                </Col>
                <Col lg={10} className="pt-3">
                    <ListProducts products={results}/>
                </Col>
            </Row>
        </Container>
    )
}