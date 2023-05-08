import { useState } from "react";
import { useCategories, useProductsDispatch } from "./DataContext";
import {
  Alert,
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
import { submitForm } from "./modals/ModalDelete";

export function CreateProduct() {
  const [responseId, setResponseId] = useState(null);
  const [name, setName] = useState("");
  const [gramms, setGramms] = useState("");
  const [protein, setProtein] = useState("");
  const [fats, setFats] = useState("");
  const [carbs, setCarbs] = useState("");
  const [calories, setCalories] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState("");

  const [modal, setModal] = useState(false);
  const categories = useCategories();

  const [error, setError] = useState(null);
  const dispatch = useProductsDispatch();
  const [addStatus, setAddStatus] = useState("");
  const [alert, setAlert] = useState(true);

  function toggle() {
    setAddStatus("");
    setError(null);
    setModal(!modal);
  }

  function alertToggle() {
    setAlert(!alert);
    toggle();
    dispatch({
      type: "REFRESH_PRODUCTS",
      item: {
        id: responseId,
        name,
        gramms,
        protein,
        fats,
        carbs,
        calories,
        categoryId,
        category,
      },
    });
    setName("");
    setGramms("");
    setProtein("");
    setFats("");
    setCarbs("");
    setCalories("");
    setCategoryId("");
  }

  if (addStatus === "success") {
    return (
      <Modal isOpen={alert} toggle={alertToggle}>
        <ModalBody>
          <Alert isOpen={alert} toggle={alertToggle}>
            {name} successfully added!
          </Alert>
        </ModalBody>
      </Modal>
    );
  }

  async function handleSubmit(event) {
    setAddStatus("submitting");
    try {
      const response = await submitForm(createProduct, {
        name,
        gramms,
        protein,
        fats,
        carbs,
        calories,
        categoryId,
      });
      setResponseId(response.id);
      setAddStatus("success");
    } catch (err) {
      setAddStatus("error");
      setError(err);
    }
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
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  setCategory(
                    categories.find(
                      (category) => category.id.toString() === e.target.value
                    )
                  );
                }}
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
          {error != null && (
            <Alert color="warning" isOpen={true}>
              Error. Cant add this item
            </Alert>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={(e) => {
              handleSubmit(e);
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
