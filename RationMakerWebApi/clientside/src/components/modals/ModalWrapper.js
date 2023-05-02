import {
    Button,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter
} from "reactstrap";
import React, {useState} from "react";

const ModalWrapper = ({ handleChange, categories, action, state, actionType, product}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    }
    
    return(
        <Container>
            {
                actionType === "create" 
                    ?
                    <Button color="danger" onClick={toggle}>
                        Add
                    </Button>
                    :
                    <Button size="sm" color="success" onClick={toggle}>
                        Edit
                    </Button>
            }
            <Modal isOpen={modal}>
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
                                value={state?.name}
                                placeholder={product ? product.name : undefined}
                                onChange={(e) => handleChange({ name: e.target.value })}
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
                                value={state?.gramms}
                                placeholder={product ? product.gramms : undefined}
                                onChange={(e) => handleChange({ gramms: e.target.value })}
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
                                value={state?.protein}
                                placeholder={product ? product.protein : undefined}
                                onChange={(e) => handleChange({ protein: e.target.value })}
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
                                value={state?.fats}
                                placeholder={product ? product.fats : undefined}
                                onChange={(e) => handleChange({ fats: e.target.value })}
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
                                value={state?.carbs}
                                placeholder={product ? product.carbs : undefined}
                                onChange={(e) => handleChange({ carbs: e.target.value })}
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
                                value={state?.calories}
                                placeholder={product ? product.calories : undefined}
                                onChange={(e) => handleChange({ calories: e.target.value })}
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
                                onChange={(e) => handleChange({ categoryId: e.target.value })}
                                required>
                                {categories?.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={(e) => toggle}>
                        Done
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </Container>
    )
}

export default ModalWrapper;