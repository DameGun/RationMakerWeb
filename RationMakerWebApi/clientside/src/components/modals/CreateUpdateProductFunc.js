import { useEffect, useState } from "react";
import { useCategories } from "../../context/DataContext";
import { Form, FormGroup, Input, Label } from "reactstrap";
import React from "react";
import { useModal } from "../../context/ModalContext";

export default function CreateUpdateProductFunc({ product }) {
  const [name, setName] = useState(product ? product.name : "");
  const [gramms, setGramms] = useState(product ? product.gramms : "");
  const [protein, setProtein] = useState(product ? product.protein : "");
  const [fats, setFats] = useState(product ? product.fats : "");
  const [carbs, setCarbs] = useState(product ? product.carbs : "");
  const [calories, setCalories] = useState(product ? product.calories : "");
  const [categoryId, setCategoryId] = useState(
    product ? product.categoryId : ""
  );

  const categories = useCategories();
  const modalContext = useModal();

  useEffect(() => {
    modalContext.dispatch({
      type: "SET_PAYLOAD",
      payload: {
        id: product.id,
        name,
        gramms,
        protein,
        fats,
        carbs,
        calories,
        categoryId,
      },
    });
  }, [calories, carbs, categoryId, fats, gramms, name, protein]);

  return (
    <Form>
      <FormGroup>
        <Label for="name">Product name</Label>
        <Input
          name="name"
          id="name"
          type="text"
          className="form-control"
          value={name}
          placeholder={product.name}
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
          placeholder={product.gramms}
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
          placeholder={product.protein}
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
          placeholder={product.fats}
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
          placeholder={product.carbs}
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
          placeholder={product.calories}
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
          defaultValue={product.categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
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
  );
}
