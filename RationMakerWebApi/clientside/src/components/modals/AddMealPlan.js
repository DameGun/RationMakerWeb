// @ts-nocheck
import { useState } from "react";
import useAuth from "../../service/useAuth";
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
  ModalHeader,
} from "reactstrap";
import { useMealPlansDispatch } from "../../service/MealPlansContext";
import React from "react";
import { addPlan } from "../../service/ApiCalls";
import { submitForm } from "./ModalDelete";

export function AddMealPlan() {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const userContext = useAuth();
  const userEmail = userContext.auth.email;
  const [responseObj, setResponseObj] = useState(null);

  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useMealPlansDispatch();

  function toggle() {
    setModal(!modal);
  }

  function alertToggle() {
    dispatch({
      type: "ADD_MEALPLAN",
      item: responseObj,
    });
    toggle();
    setName("");
    setStatus("");
    setResponseObj(null);
    setError(null);
  }

  async function handleSubmit() {
    setStatus("submitting");
    try {
      const response = await submitForm(addPlan, {
        name,
        userEmail,
      });
      setResponseObj(response);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err);
    }
  }

  return (
    <Container>
      <Button color="link" onClick={toggle}>
        Create new meal plan
      </Button>
      <Modal isOpen={modal}>
        <ModalHeader toggle={toggle}>Add new meal plan</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Meal Plan name</Label>
              <Input
                name="name"
                id="name"
                type="text"
                className="form-control1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormGroup>
          </Form>
          {status === "success" && (
            <Alert color="success" isOpen={true} toggle={alertToggle}>
              Meal plan successfully added!
            </Alert>
          )}
          {error != null && (
            <Alert color="danger" isOpen={true} toggle={alertToggle}>
              Error!
            </Alert>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit} type="submit">
            Submit
          </Button>
          <Button onClick={toggle}>Done</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}
