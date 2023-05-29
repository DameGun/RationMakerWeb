import { Form, FormGroup, Input, Label } from "reactstrap";
import React, { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext";

export default function AddMealTimeFunc({ dailyMealPlanId }) {
  const [name, setName] = useState("");
  const modalContext = useModal();

  const [validation, setValidation] = useState("");
  const payload =
    validation === "valid" ? { name, productsId: [], dailyMealPlanId } : null;

  useEffect(() => {
    if (name === "") setValidation("invalid");
    else setValidation("valid");
  }, [name]);

  useEffect(() => {
    modalContext.dispatch({
      type: "SET_PAYLOAD",
      payload: payload,
    });
  }, [validation, name]);

  return (
    <Form>
      <FormGroup>
        <Label for="name">Meal Time name</Label>
        <Input
          name="name"
          id="name"
          type="text"
          className="form-control1"
          value={name}
          valid={validation === "valid" ? true : undefined}
          invalid={validation === "invalid" ? true : undefined}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormGroup>
    </Form>
  );
}
