import React from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router } from "react-router-dom";

export default function header() {
  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="#home">Our Website's Name</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Router>
              <Nav.Link url="/About">Teams</Nav.Link>
              <Nav.Link url="/About">To-do's</Nav.Link>
            </Router>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Form
        onSubmit={function (e) {
          e.preventDefault();
          var xhttp = new XMLHttpRequest();
          xhttp.open("POST", "http://localhost:8080/post2", true);
          xhttp.setRequestHeader("Content-Type", "application/json");
          xhttp.send();
        }}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
