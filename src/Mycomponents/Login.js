import React from "react";
import "./Login.css";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Login() {
  window.user = "user_student";
  return (
    <Container id="main_container" className="mt-3 p-5 pt-5">
      <h1
        style={{
          color: "white",
          position: "Fixed",
          right: "45.7vw",
          fontFamily: "cursive",
        }}
      >
        Login
      </h1>

      <Form
        onSubmit={function (e) {
          e.preventDefault();
          var login_credentials = {
            Email: e.target.Email.value,
            Password: e.target.Password.value,
            User: window.user,
          };
          console.log(login_credentials);
          var xhttp = new XMLHttpRequest();
          xhttp.open("POST", "http://localhost:8080/login_credentials", true);
          xhttp.setRequestHeader("Content-Type", "application/json");
          xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
              var verifying_response = JSON.parse(this.responseText);
              //{status: 0, mess: "User Name or Password is wrong"}
              if(verifying_response.status===0){
                alert(verifying_response.mess)
              }else{
                window.location.href="http://localhost:3000/Home"
              }
            }
          };
          
          xhttp.send(JSON.stringify(login_credentials));
        }}
      >
        <Form.Group controlId="formGridEmail">
          <Form.Control type="email" name="Email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formGridPassword">
          <Form.Control
            type="password"
            name="Password"
            placeholder="Password"
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
            label="student"
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
      </Form>
    </Container>
  );
}
