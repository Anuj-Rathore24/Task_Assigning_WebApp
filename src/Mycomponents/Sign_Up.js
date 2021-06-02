import React from "react";
import "./Sign_Up.css";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export default function SignUp() {
  window.user = "user_student";
  return (
    <Container id="main_container2" className="mt-3 p-5 pt-5">
      <h1
        style={{
          color: "#6f5050",
          position: "Fixed",
          right: "45.7vw",
          fontFamily: "cursive",
        }}
      >
        Sign Up
      </h1>
      <Form
        className="form-input"
        onSubmit={function (e) {
          e.preventDefault();
          var target = e.target;
          for (var i = 0; i < 4; ++i) {
            if (target.elements[i].value === "") {
              alert("Enter all Credentails");
              break;
            } else {
              if (i === 3) {
                var sign_up_credentials = {
                  Email: e.target.Email.value,
                  Password: e.target.Password.value,
                  FName: e.target.First_name.value,
                  LName: e.target.Last_name.value,
                  extra_info: e.target.extra_info.value,
                  User: window.user,
                };
                console.log(sign_up_credentials);
                var xhttp = new XMLHttpRequest();
                xhttp.open(
                  "POST",
                  "http://localhost:8080/Sign_Up_Credentials",
                  true
                );
                xhttp.setRequestHeader("Content-Type", "application/json");
                xhttp.send(JSON.stringify(sign_up_credentials));
                try {
                  console.log("working")
                  console.log(window.user)
                  (window.user==="user_student"?window.location.href="http://localhost:3000/HomeS":window.location.href = "http://localhost:3000/Home")
                  // window.location.href = "http://localhost:3000/Home";
                } catch (err) {
                  console.log(err);
                }
              }
            }
          }
        }}
      >
        <Form.Group controlId="formGridEmail">
          <Form.Control name="Email" type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formGridPassword">
          <Form.Control
            name="Password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group controlId="Fname">
          <Form.Control name="First_name" placeholder="First Name" />
        </Form.Group>

        <Form.Group controlId="LName">
          <Form.Control name="Last_name" placeholder="Last Name" />
        </Form.Group>

        <Form.Group controlId="formGridCity">
          <Form.Control
            name="extra_info"
            placeholder="Enter Class Code/Subject"
          />
        </Form.Group>

        <Form.Group id="formGridCheckbox">
          <Form.Check
            type="radio"
            label="Teacher"
            name="Seperator"
            onClick={function () {
              window.user = "user_teacher";
            }}
          />
        </Form.Group>
        <Form.Group id="formGridCheckbox">
          <Form.Check
            type="radio"
            label="Student"
            name="Seperator"
            defaultChecked
            onClick={function () {
              window.user = "user_student";
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <a href="/login">Login In</a>
      </Form>
    </Container>
  );
}
