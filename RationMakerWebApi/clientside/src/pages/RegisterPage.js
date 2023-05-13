import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { registerUser } from "../service/ApiCalls";
import { Link } from "react-router-dom";
import { submitForm } from "../components/modals/ModalDelete";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  async function submit(e) {
    e.preventDefault();

    try {
      await submitForm(registerUser, {
        name,
        email,
        password,
      });

      setSuccess(true);

      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email Taken");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  }

  return (
    <>
      {success ? (
        <Container>
          <h1>Success!</h1>
          <p>
            <Link to={"/login"}>Sign in</Link>
          </p>
        </Container>
      ) : (
        <Container>
          <Row>
            <Col
              md={{
                offset: 4,
                size: 3,
              }}
              className="my-3"
            >
              <p
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h4>Register</h4>
            </Col>
          </Row>
          <Row>
            <Col
              md={{
                offset: 4,
                size: 3,
              }}
            >
              <Form onSubmit={submit}>
                <FormGroup>
                  <Label for="Name" hidden>
                    Name
                  </Label>
                  <Input
                    id="Name"
                    name="name"
                    placeholder="Name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="Email" hidden>
                    Email
                  </Label>
                  <Input
                    id="Email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="Password" hidden>
                    Password
                  </Label>
                  <Input
                    id="Password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <Row>
                  <Button color="primary" outline={true} type="submit">
                    Submit
                  </Button>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
