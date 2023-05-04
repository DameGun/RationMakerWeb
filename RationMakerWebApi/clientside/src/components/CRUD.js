import { useContext, useState } from "react";
import { useCategories, useProducts } from "./DataContext";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { createProduct } from "../service/ApiCalls";

export function CreateProduct() {
  const [name, setName] = useState("");
  const [gramms, setGramms] = useState("");
  const [protein, setProtein] = useState("");
  const [fats, setFats] = useState("");
  const [carbs, setCarbs] = useState("");
  const [calories, setCalories] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [modal, setModal] = useState(false);
  const categories = useCategories();

  function toggle() {
    setModal(!modal);
  }

  function handleSubmit(event) {
    event.preventDefault();
    createProduct({ name, gramms, protein, fats, carbs, calories, categoryId });
    setName("");
    setGramms("");
    setProtein("");
    setFats("");
    setCarbs("");
    setCalories("");
    setCategoryId("");
  }

  return (
    <Container>
      <Button color="danger" onClick={toggle}>
        Add
      </Button>
      <Modal isOpen={modal}>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Product name</Label>
              <Input
                name="name"
                id="name"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="gramms">Gramms</Label>
              <Input
                name="gramms"
                id="gramms"
                type="text"
                className="form-control"
                value={gramms}
                onChange={(e) => setGramms(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="protein">Protein</Label>
              <Input
                name="protein"
                id="protein"
                type="text"
                className="form-control"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="fats">Fats</Label>
              <Input
                name="fats"
                id="fats"
                type="text"
                className="form-control"
                value={fats}
                onChange={(e) => setFats(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="carbs">Carbs</Label>
              <Input
                name="carbs"
                id="carbs"
                type="text"
                className="form-control"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="calories">Calories</Label>
              <Input
                name="calories"
                id="calories"
                type="text"
                className="form-control"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">Category</Label>
              <Input
                id="category"
                name="category"
                type="select"
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                <option>-- Select category --</option>
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
          <Button
            color="danger"
            onClick={(e) => {
              handleSubmit(e);
              toggle();
            }}
          >
            Done
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}
