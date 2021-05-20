//rfc=snippet for boiler plate
import React from "react";
import "./home.css"
import { Col,Row, Container } from "react-bootstrap";
// var xhttp = new XMLHttpRequest();
// xhttp.open("POST", "http://localhost:8080/user_information_home", true);
// xhttp.setRequestHeader("Content-Type", "application/json");
// xhttp.onreadystatechange = function () {
//   if (this.readyState === 4 && this.status === 200) {
//     window.main_list = JSON.parse(this.responseText);
//     console.log(window.main_list)
//   }
// };
// xhttp.send();

export default function home() {
  return (
    <div>
      <Container>
        <Row>
          <Col className="main_columns" id="col-1">1 of 1</Col>
          <Col className="main_columns" id="col-2">1 of 1</Col>
          <Col className="main_columns" id="col-3">1 of 1</Col>
        </Row>
      </Container>
    </div>
  );
}
