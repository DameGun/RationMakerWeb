import { Container, Row } from "reactstrap";
import React from "react";
import { useMealPlans } from "../context/MealPlansContext";
import MealPlanCard from "../components/MealPlanCard";

export default function MealPlansPage() {
  const mealPlans = useMealPlans();

  return (
    <Container>
      <Row>
        {mealPlans.map((mealplan) => (
          <MealPlanCard mealPlan={mealplan} key={mealplan.id} />
        ))}
      </Row>
    </Container>
  );
}
