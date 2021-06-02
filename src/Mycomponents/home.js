// rfc=snippet for boiler plate
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
const axios = require("axios");
axios.defaults.withCredentials = true;
export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ClassData: [],
      AssignmentData: [],
      StudentList: [],
      show: false,
      Create_assi_show: false,
      show_assignement: false,
      list_element1: [1, 2, 3],
      UserInfo: [],
    };
  }
  componentDidMount() {
    axios
      .post("http://localhost:8080/Class_Information", {
        headers: {
          "Access-Control-Allow-Origin": "https://localhost:3000",
        },
      })
      .then(
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
    const assignment_api = (ID) => {
      window.class_selected_Id = ID;
      axios
        .post("http://localhost:8080/testing_assignment", { Class_ID_req: ID })
        .then(
          function (response) {
            this.setState({
              AssignmentData: response.data,
            });
          }.bind(this)
        );
    };
    const show_status = (ID) => {
      this.state.AssignmentData.forEach((element) => {
        if (ID === element.Discription) {
          window.student_object = {};
          var NotSubmitted = element.Not_submitted.split(",");
          window.student_object.NotSubmitted = NotSubmitted;
          var OnTime = element.Ontime_list.split(",");
          window.student_object.OnTime = OnTime;
          var LateSubmission = element.late_submitted.split(",");
          window.student_object.LateSubmission = LateSubmission;
        }
      });
      this.setState(
        {
          StudentList: window.student_object,
        },
        () => {
          var para_after = document.getElementById("After");
          var para_Before = document.getElementById("Before");
          var para_Not = document.getElementById("Not");

          para_after.innerHTML = "";
          para_Before.innerHTML = "";
          para_Not.innerHTML = "";

          this.state.StudentList.LateSubmission.forEach((element) => {
            if (element !== " ") {
              this.setState(
                {
                  list_element1: element.split("$"),
                },
                () => {
                  para_after.innerHTML +=
                    "<br>" +
                    "ID :" +
                    this.state.list_element1[0] +
                    "<br>" +
                    "Time :" +
                    this.state.list_element1[1] +
                    "<br>" +
                    `<Button class='button_view View_Assi_button'> View Work </Button>`;
                }
              );
            } else {
              para_after.innerHTML = "No Student";
            }
          });
          this.state.StudentList.OnTime.forEach((element) => {
            if (element !== " ") {
              var list_element2 = element.split("$");
              para_Before.innerHTML +=
                "<br>" +
                "ID :" +
                list_element2[0] +
                "<br>" +
                "Time :" +
                list_element2[1] +
                "<br>" +
                "<Button class='button_view View_Assi_button'> View Work</Button>";
            } else {
              para_Before.innerHTML = "No Student";
            }
          });
          this.state.StudentList.NotSubmitted.forEach((element) => {
            if (element !== " ") {
              var list_element3 = element.split("$");
              para_Not.innerHTML += "<br>" + "ID :" + list_element3[0];
            } else {
              para_Not.innerHTML = "No Student";
            }
          });
          var button_assi = document.getElementsByClassName("View_Assi_button");
          console.log(button_assi)
          for (var i = 0; i < button_assi.length; i++) {
            var button_assi2 = button_assi[i];
            button_assi2.onclick = function () {
              console.log(button_assi2)
              console.log("working")
              alert("ho ho ho");
            };
          }
        }
      );
    };
    const handleClose = () => this.setState({ show: false });
    const handleShow = () => this.setState({ show: true });
    const assi_handleClose = () => this.setState({ Create_assi_show: false });
    const assi_handleShow = () => this.setState({ Create_assi_show: true });
    //
    return (
      <div>
        <Navbar className="Navbar" variant="dark">
          <Navbar.Brand>App's Name</Navbar.Brand>
          <Navbar.Brand>
            {this.state.UserInfo.First_Name} {this.state.UserInfo.Last_Name}
          </Navbar.Brand>
        </Navbar>
        <Container>
          <Row>
            <Col className="main_columns" id="col-1">
              <h2>Classes Created</h2>
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
              <h2>Assignments Given</h2>
              {this.state.AssignmentData.map((list, index) => {
                return (
                  <Component2 key={index} list={list} function={show_status} />
                );
              })}
              <Button onClick={assi_handleShow}>Add assignment</Button>
            </Col>
            <Col className="main_columns" id="col-3">
              <h2>Students</h2>
              <h4>Before Due Date</h4>
              <div className="div_para_student">
                <p className="para_student" id="Before"></p>
              </div>
              <h4>Late Submission</h4>
              <div className="div_para_student">
                <p className="para_student" id="After"></p>
              </div>
              <h4>Not submitted</h4>
              <div className="div_para_student">
                <p className="para_student" id="Not"></p>
              </div>
            </Col>
          </Row>
        </Container>

        {/* modals */}
        <Modal show={this.state.show} onHide={handleClose} keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Add Class</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                handleClose();
                e.preventDefault();
                axios
                  .post("/Add_Class", { Class_Name: e.target.Class_Name.value })
                  .then(() => {
                    window.location.reload();
                  });
              }}
            >
              <Form.Group controlId="formGroupEmail">
                <Form.Label className="text-secondary">Class Name</Form.Label>
                <Form.Control
                  name="Class_Name"
                  type="text"
                  placeholder="Enter Name of The Class"
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

        {/* Model for adding assignments */}
        <Modal
          show={this.state.Create_assi_show}
          onHide={assi_handleClose}
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Assignment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                assi_handleClose();
                e.preventDefault();
                axios
                  .post("/Add_Assignment", {
                    Class_ID: window.class_selected_Id,
                    Due_Date: e.target.Date_time.value,
                    DESC: e.target.assi_description.value,
                  })
                  .then(() => {
                    window.location.reload();
                  });
              }}
            >
              <Form.Group controlId="formGroupEmail">
                <Form.Label className="text-secondary">Description</Form.Label>
                <Form.Control
                  name="assi_description"
                  type="text"
                  placeholder="Enter Description"
                />
              </Form.Group>
              <Form.Group controlId="formGroupEmail">
                <Form.Label className="text-secondary">Due Date</Form.Label>
                <Form.Control name="Date_time" type="date" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Create Assignment
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
          <Button variant="secondary" onClick={assi_handleClose}>
            Close
          </Button>
        </Modal>

      </div>
    );
  }
}
