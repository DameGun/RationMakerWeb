import React from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";

const Missing = () => {
  return (
    <Container class="d-flex align-items-center justify-content-center">
      <article style={{ padding: "100px" }}>
        <h1>Oops!</h1>
        <p>Page Not Found</p>
        <div className="flexGrow">
          <Link to="/">Visit Our Homepage</Link>
        </div>
      </article>
    </Container>
  );
};

export default Missing;
