import { Container, Row } from "reactstrap";
import React from "react";
import { MealPlanCards } from "../components/MealPlanCards";

export default function MealPlansPage() {
  return (
    <Container>
      <Row>
        <MealPlanCards />
      </Row>
    </Container>
  );
}
