import React from "react";
import "./Login.css";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Login() {
    return (
    <Container id="main_container" className="mt-3 p-5 pt-5">
      <h1 style={{color:"white", position:"Fixed", right:"45.7vw", fontFamily:"cursive"}}>Login</h1>

      <Form>
        <Form.Group controlId="formGridEmail">
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formGridPassword">
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group id="formGridCheckbox">
          <Form.Check type="checkbox" label="Teacher" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
