// @ts-nocheck
import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Table,
  UncontrolledCollapse,
} from "reactstrap";
import { FaChevronDown } from "react-icons/fa";
import { useMealPlans } from "../service/MealPlansContext";

export function MealPlanCards() {
  const mealPlans = useMealPlans();

  return (
    <>
      {mealPlans.map((mealPlan) => (
        <Col md="4" key={mealPlan.id}>
          <Card
            className="my-2"
            style={{
              width: "18rem",
            }}
            key={mealPlan.id}
          >
            <CardHeader tag={"h4"}>
              <b>{mealPlan.name}</b>
            </CardHeader>
            <CardBody>
              <ListGroup flush>
                {mealPlan.mealTimes.map((mealTime) => (
                  <ListGroupItem key={mealTime.id}>
                    <div className="d=flex flex-direction-row">
                      <h5>{mealTime.name}</h5>
                      <FaChevronDown
                        id={mealTime.name + mealTime.id}
                      ></FaChevronDown>
                    </div>
                    {/* <Button
                      color="primary"
                      id={mealTime.name + mealTime.id}
                      style={{
                        marginBottom: "1rem",
                      }}
                    >
                      Toggle
                    </Button> */}
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
              <Container className="d-flex justify-content-around">
                <Button>Open</Button>
                <Button color="primary">Edit</Button>
                <Button color="danger">Delete</Button>
              </Container>
            </CardBody>
          </Card>
        </Col>
      ))}
    </>
  );
}
