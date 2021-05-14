import React from "react";
import "./Sign_Up.css";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export default function SignUp() {
  return (
    <Container id="main_container2" className="mt-3 p-5 pt-5">
      <h1 style={{color:"white", position:"Fixed", right:"45.7vw", fontFamily:"cursive"}}>Sign Up</h1>
      {/* <Navbar bg="dark" expand="lg" variant="dark">
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
        */}
      <Form className="form-input">
        
          <Form.Group controlId="formGridEmail">
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formGridPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

    
          <Form.Group controlId="Fname">
            <Form.Control placeholder="First Name" />
          </Form.Group>

          <Form.Group controlId="LName">
            <Form.Control placeholder="Last Name" />
          </Form.Group>
  

        <Form.Group controlId="formGridCity">
          <Form.Control placeholder="Enter Class Code"/>
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
