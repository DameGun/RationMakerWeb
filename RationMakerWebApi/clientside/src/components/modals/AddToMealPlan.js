import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
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
import {
  useMealPlans,
  useMealPlansDispatch,
} from "../../service/MealPlansContext";
import { AddMealPlan } from "./AddMealPlan";
import { AddMealTime } from "./AddMealTime";
import { submitForm } from "./ModalDelete";
import { addProductToMealTime } from "../../service/ApiCalls";

export function AddToMealPlan({ productId }) {
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");

  const mealPlansContext = useMealPlans();
  const dispatch = useMealPlansDispatch();

  const [mealPlanId, setMealPlanId] = useState("");
  const [mealPlan, setMealPlan] = useState(null);
  const [mealTimeId, setMealTimeId] = useState("");
  const [mealTime, setMealTime] = useState(null);

  function alertToggle() {
    console.log(mealTime);
    // dispatch({
    //   type: "UPDATE_MEALTIME",
    //   item: mealTime,
    // });
    console.log(mealPlansContext);
    toggle();
    setMealPlan(null);
    setMealPlanId("");
    setMealTime(null);
    setMealTimeId("");
    setStatus("");
    setError(null);
  }

  function toggle() {
    setStatus("");
    setError(null);
    setModal(!modal);
  }

  async function handleSubmit() {
    setStatus("submitting");
    try {
      const response = await submitForm(addProductToMealTime, {
        mealTimeId,
        productId,
      });
      console.log(response);
      setMealTime(response);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err);
    }
  }

  function handleChange(e, type) {
    console.log(mealPlan);
    switch (type) {
      case "mealPlan": {
        if (e.target.value === "") {
          setMealPlanId("");
          setMealPlan(null);
        } else {
          setMealPlanId(e.target.value);
          setMealPlan(
            mealPlansContext.find(
              (mealPlan) => mealPlan.id.toString() === e.target.value
            )
          );
        }
        break;
      }
      case "mealTime": {
        if (e.target.value === "") {
          setMealTimeId("");
          setMealTime(null);
        } else {
          setMealTimeId(e.target.value);
          setMealTime(
            mealPlan.mealTimes.find(
              (mealTime) => mealTime.id.toString() === e.target.value
            )
          );
        }
        break;
      }
      default:
        break;
    }
  }

  return (
    <Container>
      <Button size="sm" onClick={toggle}>
        Meal
      </Button>
      <Modal isOpen={modal}>
        <ModalHeader toggle={toggle}>Add product to meal plan</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleSelect">Select meal plan</Label>
              <Input
                id="mealPlan"
                name="mealPlan"
                type="select"
                onChange={(e) => {
                  handleChange(e, "mealPlan");
                }}
                required
              >
                <option value={""}>-- Select meal plan --</option>
                {mealPlansContext.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Input>
              <AddMealPlan />
            </FormGroup>
            {mealPlan !== null && (
              <FormGroup>
                <Label for="exampleSelect">Select meal time</Label>
                <Input
                  id="mealTime"
                  name="mealTime"
                  type="select"
                  onChange={(e) => {
                    handleChange(e, "mealTime");
                  }}
                  required
                >
                  <option value={""}>-- Select meal time --</option>
                  {mealPlan.mealTimes !== null &&
                    mealPlan.mealTimes.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                </Input>
                <AddMealTime dailyMealPlanId={mealPlanId} />
              </FormGroup>
            )}
          </Form>
          {status === "success" && (
            <Alert color="success" isOpen={true} toggle={alertToggle}>
              Product successfully added!
            </Alert>
          )}
          {error != null && (
            <Alert color="danger" isOpen={true} toggle={alertToggle}>
              Error!
            </Alert>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            disabled={mealTime == null && true}
            onClick={handleSubmit}
          >
            Select
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}
