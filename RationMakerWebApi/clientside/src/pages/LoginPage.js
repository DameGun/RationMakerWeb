// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import { loginUser } from "../service/ApiCalls";
import { useNavigate } from "react-router-dom";
import useAuth from "../service/useAuth";
import { submitForm } from "../service/SubmitForm";
import { Loading } from "../components/Loading";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  async function submit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const response = await submitForm(loginUser, { email, password });

      const accessToken = response.accessToken;
      setAuth({ email, password, accessToken });
      setEmail("");
      setPassword("");
      setStatus("success");

      return navigate("/");
    } catch (err) {
      setStatus("error");
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  }

  return (
    <Container>
      <Row>
        <Col
          md={{
            offset: 4,
            size: 3,
          }}
          className="my-3"
        >
          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <h4>Login</h4>
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
            <Row className="d-flex justify-content-center">
              {status === "submitting" ? (
                <Loading />
              ) : (
                <Button color="primary" outline={true} type="submit">
                  Submit
                </Button>
              )}
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
