import React from "react";
import { Container, Spinner } from "reactstrap";

export function Loading() {
  return (
    <Container className="mt-5 d-flex align-items-center justify-content-center">
      <Spinner
        color="primary"
        style={{
          height: "3rem",
          width: "3rem",
        }}
      >
        Loading...
      </Spinner>
    </Container>
  );
}
