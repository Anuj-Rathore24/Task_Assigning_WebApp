import React, { Component } from "react";
import "./home.css";
import {
  Col,
  Row,
  Container,
  Navbar,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import Component1 from "./HomeComponent1.js";
import Component2 from "./HomeComponent2.js";
import accountIcon from "../Mycomponents/files_folder/black-24dp/2x/outline_account_circle_black_24dp.png";
// import { response } from "express";
const axios = require("axios").default;

export default class HomeS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ClassData: [],
      AssignmentData: [],
      UserInfo: [],
    };
  }
  componentDidMount() {
    axios.post("/Classes_student1");
    axios.post("/Classes_student2").then(
      function (response) {
        this.setState({
          ClassData: response.data,
        });
      }.bind(this)
    );
    axios.post("http://localhost:8080/user_information_home").then(
      function (response) {
        this.setState({
          UserInfo: response.data,
        });
      }.bind(this)
    );
  }
  render() {
    const form_submit=()=>{
      axios.post("/submit_user_assignment2",{Class_Id:window.class_selected_Id,DESC:window.current_descrpition}).then(function(response){
        console.log(response)
      })
    }
    const show_status = (DESC) => {
      window.current_descrpition=DESC
      axios
        .post(
          "http://localhost:8080/Checking_assignment_status",
          {
            Class_ID_req: window.class_selected_Id,
            DESC: DESC,
          },
          { withCredentials: true }
        )
        .then(function (response) {
          document.getElementById("Heading").innerHTML = response.data.Status_A;
          var para_assi = document.getElementById("Assignment_para");
          if (response.data.Status_A !== "Not Submitted") {
            para_assi.innerHTML = `Time: ${response.data.data[1]} <br> <button class="button_view">View</button>`;
          } else {
            para_assi.innerHTML = `<form style='margin:0px; margin-top:0px;' action='submit_user_assignment' method='post' enctype="multipart/form-data"><input name='filetoupload' type="file" id='view_button'></input><input id='form_id' type='submit'></input></form>`;
            document.getElementById('form_id').onclick=form_submit
          }
        });
    };
    const assignment_api = (ID) => {
      window.class_selected_Id = ID;
      axios
        .post(
          "http://localhost:8080/testing_assignment",
          { Class_ID_req: ID },
          { withCredentials: true }
        )
        .then(
          function (response) {
            console.log(response);
            this.setState({
              AssignmentData: response.data,
            });
          }.bind(this)
        );
      // document.getElementById("add_assi_button").disabled = false;
    };
    const handleClose = () => this.setState({ show: false });
    const handleShow = () => this.setState({ show: true });
    return (
      <div>
        <Navbar className="Navbar" variant="dark">
          <Navbar.Brand>App's Name</Navbar.Brand>
          <Navbar.Brand>
            {this.state.UserInfo.First_Name} {this.state.UserInfo.Last_Name}
          </Navbar.Brand>
          <img src={accountIcon}></img>
        </Navbar>
        <Container>
          <Row>
            <Col className="main_columns" id="col-1">
              <h2>Classes Joined</h2>
              {console.log(this.state.ClassData)}
              {this.state.ClassData.map((list, index) => {
                return (
                  <Component1
                    key={index}
                    list={list}
                    function={assignment_api}
                  />
                );
              })}
              <Button onClick={handleShow}>Add Class</Button>
            </Col>
            <Col className="main_columns" id="col-2">
              <h2>Assignment</h2>
              {this.state.AssignmentData.map((list, index) => {
                return (
                  <Component2 key={index} list={list} function={show_status} />
                );
              })}
            </Col>
            <Col className="main_columns" id="col-3">
              <h2 id="Heading"></h2>
              <p id="Assignment_para"></p>
            </Col>
          </Row>
        </Container>
        <Modal show={this.state.show} onHide={handleClose} keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Join Class</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                handleClose();
                e.preventDefault();
                console.log(e.target.Class_Id.value);
                axios
                  .post(
                    "/Add_Class_Student",
                    { Class_Id: e.target.Class_Id.value },
                    { withCredentials: true }
                  )
                  .then(() => {
                    window.location.reload();
                    console.log("page_reloaded");
                  });
              }}
            >
              <Form.Group controlId="formGroupEmail">
                <Form.Label className="text-secondary">Class ID</Form.Label>
                <Form.Control
                  name="Class_Id"
                  type="text"
                  placeholder="Enter ID of The Class"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Create Class
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal>
      </div>
    );
  }
}
