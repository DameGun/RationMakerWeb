import React, { useEffect } from "react";
import { useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { useModal } from "../../context/ModalContext";

export default function UpdateMealTimeFunc({ mealTime }) {
  const [mealTimeUpdated, setMealTimeUpdated] = useState(mealTime);
  const modalContext = useModal();

  const [validation, setValidation] = useState("");
  const payload =
    validation === "valid"
      ? { mealTime: mealTimeUpdated, opType: "updateName" }
      : null;

  useEffect(() => {
    if (mealTimeUpdated.name === "" || mealTimeUpdated.name === mealTime.name) {
      setValidation("invalid");
    } else setValidation("valid");
  }, [mealTimeUpdated]);

  useEffect(() => {
    modalContext.dispatch({
      type: "SET_PAYLOAD",
      payload: payload,
    });
  }, [validation, mealTimeUpdated]);

  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="inputName">MealTime name</Label>
          <Input
            name="name"
            id="name"
            type="text"
            className="form-control"
            valid={validation === "valid" ? true : undefined}
            invalid={validation === "invalid" ? true : undefined}
            value={mealTimeUpdated.name}
            placeholder={mealTimeUpdated.name}
            onChange={(e) =>
              setMealTimeUpdated({ ...mealTimeUpdated, name: e.target.value })
            }
            required
          ></Input>
        </FormGroup>
      </Form>
    </div>
  );
}
