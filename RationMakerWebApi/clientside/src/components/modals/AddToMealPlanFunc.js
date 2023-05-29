import { useEffect, useState } from "react";
import { useMealPlans } from "../../context/MealPlansContext";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import React from "react";
import { useModal } from "../../context/ModalContext";
import { ModalWrapper } from "./ModalWrapper";
import { addMealTime, addPlan } from "../../service/ApiCalls";
import AddMealPlanFunc from "./AddMealPlanFunc";
import AddMealTimeFunc from "./AddMealTimeFunc";

export default function AddToMealPlanFunc({ productId }) {
  const mealPlansContext = useMealPlans();
  const [mealPlanId, setMealPlanId] = useState("");
  const [mealPlan, setMealPlan] = useState(null);
  const [mealTimeId, setMealTimeId] = useState("");
  const modalContext = useModal();

  const [validation, setValidation] = useState("");
  const payload = validation === "valid" ? { mealTimeId, productId } : null;

  useEffect(() => {
    if (mealTimeId === "") setValidation("invalid");
    else setValidation("valid");
  }, [mealTimeId]);

  useEffect(() => {
    modalContext.dispatch({
      type: "SET_PAYLOAD",
      payload: payload,
    });
  }, [validation]);

  function handleChange(e, type) {
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
          // setMealTime(null);
        } else {
          setMealTimeId(e.target.value);
          // setMealTime(
          //   mealPlan.mealTimes.find(
          //     (mealTime) => mealTime.id.toString() === e.target.value
          //   )
          // );
        }
        break;
      }
      default:
        break;
    }
  }

  return (
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
        <ModalWrapper
          modalHeader={"Add meal plan"}
          service={addPlan}
          dispatchType={"mealplan"}
          dispatchName={"ADD_MEALPLAN"}
          button={
            <Button color="link" type="button">
              Create new meal plan
            </Button>
          }
        >
          <AddMealPlanFunc />
        </ModalWrapper>
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
          <ModalWrapper
            modalHeader={"Add meal time"}
            service={addMealTime}
            dispatchType={"mealplan"}
            dispatchName={"ADD_MEALTIME"}
            button={
              <Button color="link" type="button">
                Create new meal time
              </Button>
            }
          >
            <AddMealTimeFunc dailyMealPlanId={mealPlanId} />
          </ModalWrapper>
        </FormGroup>
      )}
    </Form>
  );
}
