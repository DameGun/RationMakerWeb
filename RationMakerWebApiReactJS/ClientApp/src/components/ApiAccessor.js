import React, {useEffect} from "react";
import {Button, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

class ApiAccessor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            categories: [],
            id: '',
            name: '',
            gramms: '',
            protein: '',
            fats: '',
            carbs: '',
            calories: '',
            categoryId: '',
            modal: false
        }
        
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // create entity
    create(e) {
        e.preventDefault();
        fetch('product', {
            "method": "POST",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify({
                name: this.state.name,
                gramms: this.state.gramms,
                protein: this.state.protein,
                fats: this.state.fats,
                carbs: this.state.carbs,
                calories: this.state.calories,
                categoryId: this.state.categoryId
            })
        })
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.log(err));
        this.handleChange({modal: !this.state.modal})
    }
    
    // update entity
    update(e) {
        e.preventDefault();
        fetch(`product/update/${this.props.product.id}`, {
            "method": "PUT",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify({
                name: this.state.name,
                gramms: this.state.gramms,
                protein: this.state.protein,
                fats: this.state.fats,
                carbs: this.state.carbs,
                calories: this.state.calories,
                categoryId: this.state.categoryId
            })
        })
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.log(err));
        this.handleChange({modal: !this.state.modal})
    }
    
    handleChange(changeObject) {
        this.setState(changeObject);
        console.log(this.state.categories);
    }
    
    
    render() {
        return(
            <Container>
                <Button size="" color="danger" onClick={e => this.setState({modal: !this.modal})}>
                    Add
                </Button>
                <Modal isOpen={this.state.modal}>
                    <ModalHeader >Add product</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">
                                    Product name
                                </Label>
                                <Input
                                    name="name"
                                    id="name"
                                    type="text"
                                    className="form-control"
                                    value={this.state.name}
                                    onChange={(e) => this.handleChange({ name: e.target.value })}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="gramms">
                                    Gramms
                                </Label>
                                <Input
                                    name="gramms"
                                    id="gramms"
                                    type="text"
                                    className="form-control"
                                    value={this.state.gramms}
                                    onChange={(e) => this.handleChange({ gramms: e.target.value })}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="protein">
                                    Protein
                                </Label>
                                <Input
                                    name="protein"
                                    id="protein"
                                    type="text"
                                    className="form-control"
                                    value={this.state.protein}
                                    onChange={(e) => this.handleChange({ protein: e.target.value })}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="fats">
                                    Fats
                                </Label>
                                <Input
                                    name="fats"
                                    id="fats"
                                    type="text"
                                    className="form-control"
                                    value={this.state.fats}
                                    onChange={(e) => this.handleChange({ fats: e.target.value })}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="carbs">
                                    Carbs
                                </Label>
                                <Input
                                    name="carbs"
                                    id="carbs"
                                    type="text"
                                    className="form-control"
                                    value={this.state.carbs}
                                    onChange={(e) => this.handleChange({ carbs: e.target.value })}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="calories">
                                    Calories
                                </Label>
                                <Input
                                    name="calories"
                                    id="calories"
                                    type="text"
                                    className="form-control"
                                    value={this.state.calories}
                                    onChange={(e) => this.handleChange({ calories: e.target.value })}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">
                                    Category
                                </Label>
                                <Input
                                    id="category"
                                    name="category"
                                    type="select"
                                    onChange={(e) => this.handleChange({ categoryId: e.target.value })}
                                    required>
                                    {this.props.categories.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={(e) => this.create(e)}>
                            Add
                        </Button>
                        <Button color="secondary" onClick={e => this.handleChange({modal: !this.state.modal})}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </Container>
        )
    }
}

export default ApiAccessor;