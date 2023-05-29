import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { GrEdit, GrFormEdit, GrTrash } from "react-icons/gr";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Table,
  UncontrolledCollapse,
} from "reactstrap";
import { ModalWrapper } from "./modals/ModalWrapper";
import {
  deleteMealPlan,
  updateMealPlan,
  updateMealTime,
} from "../service/ApiCalls";
import DeleteFunc from "./modals/DeleteFunc";
import { useMealPlansDispatch } from "../context/MealPlansContext";
import { submitForm } from "../service/SubmitForm";
import UpdateMealTimeFunc from "./modals/UpdateMealTimeFunc";

export default function MealPlanCard({ mealPlan }) {
  const [inputName, setInputName] = useState(mealPlan.name);
  const mealPlanUpdated = { ...mealPlan, name: inputName, appUser: null };
  const dispatch = useMealPlansDispatch();
  const [status, setStatus] = useState(undefined);

  async function changeName() {
    if (inputName !== mealPlan.name) {
      try {
        const response = await submitForm(updateMealPlan, mealPlanUpdated);
        console.log("response: ", response);
        setStatus("valid");
        dispatch({
          type: "UPDATE_MEALPLAN",
          payload: response,
        });
      } catch (err) {
        setStatus("invalid");
      }
    }
  }

  async function removeProduct({ mealTime, productProp }) {
    try {
      const mealTimeUpdated = {
        ...mealTime,
        meal: mealTime.meal.filter((product) => product.id !== productProp.id),
      };
      const response = await submitForm(updateMealTime, {
        mealTime: mealTimeUpdated,
        opType: "removeProduct",
      });
      console.log("response: ", response);
      dispatch({
        type: "REMOVE_PRODUCT",
        payload: response,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Col md="4" key={mealPlan.id}>
      <Card
        className="my-2"
        style={{
          width: "18rem",
        }}
        key={mealPlan.id}
      >
        <CardHeader className="d-flex align-items-center">
          <InputGroup className="me-4">
            <Input
              placeholder="MealPlan name"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              valid={status === "valid" ? true : undefined}
              invalid={status === "invalid" ? true : undefined}
            />
            <Button size="sm" outline={true} onClick={changeName}>
              <GrFormEdit />
            </Button>
          </InputGroup>
          <ModalWrapper
            modalHeader={"Delete meal plan"}
            service={deleteMealPlan}
            dispatchType={"mealplan"}
            dispatchName={"DELETE_MEALPLAN"}
            button={
              <Button size="sm" color="black" outline={true}>
                <GrTrash />
              </Button>
            }
          >
            <DeleteFunc data={mealPlan}></DeleteFunc>
          </ModalWrapper>
        </CardHeader>
        <CardBody>
          <ListGroup flush>
            {mealPlan.mealTimes.map((mealTime) => (
              <ListGroupItem key={mealTime.id}>
                <div className="d-flex flex-direction-row justify-content-between">
                  <div className="d-flex align-items-center">
                    <h5 className="me-3">{mealTime.name}</h5>
                    <FaChevronDown id={mealTime.name + mealTime.id} />
                  </div>
                  <div>
                    <ModalWrapper
                      modalHeader={"Edit mealtime"}
                      service={updateMealTime}
                      dispatchType={"mealplan"}
                      dispatchName={"UPDATE_MEALTIME"}
                      button={
                        <Button size="sm" color="black" outline={true}>
                          <GrEdit />
                        </Button>
                      }
                    >
                      <UpdateMealTimeFunc
                        mealTime={mealTime}
                      ></UpdateMealTimeFunc>
                    </ModalWrapper>
                  </div>
                </div>
                <UncontrolledCollapse
                  toggler={"#" + mealTime.name + mealTime.id}
                >
                  <Card>
                    <CardBody>
                      {mealTime.meal.length === 0 ? (
                        "No products"
                      ) : (
                        <Table>
                          <tbody>
                            {mealTime.meal.map((product) => (
                              <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.gramms}gr</td>
                                <td>
                                  <Button
                                    size="sm"
                                    color="black"
                                    outline
                                    className="ms-2"
                                    onClick={(e) =>
                                      removeProduct({
                                        mealTime,
                                        productProp: product,
                                      })
                                    }
                                  >
                                    <GrTrash />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      )}
                    </CardBody>
                  </Card>
                </UncontrolledCollapse>
              </ListGroupItem>
            ))}
          </ListGroup>
          <Container className="d-flex justify-content-around"></Container>
        </CardBody>
      </Card>
    </Col>
  );
}
