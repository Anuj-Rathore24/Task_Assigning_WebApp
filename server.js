const express = require("express");
const app = express();
const cors = require("cors");
const formidable = require("formidable");
const fs = require("fs");
let date_ob = new Date();

//cors libarary is for handling security messages from browser(while using xhttp requests)
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
    credentials: true,
  })
);

var cookieParser = require("cookie-parser");
app.use(cookieParser());
const mysql = require("mysql");
const { error } = require("console");
const { createConnection } = mysql;

var con = createConnection({
  host: "localhost",
  user: "root",
  password: "philanthropist",
});

con.query("use Task_assign_webapp");

// middleware
app.use(express.json());
app.use(express.urlencoded());

//session creation

var session = require("express-session");
app.use(
  session({
    name: "Session_Id",
    saveUninitialized: true,
    resave: false,
    secret: "auth",
    Cookie: {},
  })
);
var user_info = {};
var complete_user_inforamtion;
//post requests
app.post("/Sign_Up_Credentials", (req, res) => {
  var Credentials = req.body;
  con.query(
    `insert into ${Credentials.User} values("${Credentials.Email}","${Credentials.Password}","${Credentials.FName}","${Credentials.LName}","${Credentials.extra_info}")`,
    function (err, result) {
      if (err) throw err;
      req.session.UserId = Credentials.Email;
      req.session.User = Credentials.User;
      user_info.userid = req.session.UserId;
      user_info.user = req.session.User;
      complete_user_inforamtion = Credentials;
      con.query(`select Not_submitted from assignments_table where CLass_Id="${Credentials.extra_info}"`,(err,result)=>{
        if(err) throw err;
        console.log(result)
        // result[0].forEach(element => {
        //   var old_list=element.Not_submitted
        // });
      })
    }
  );
});
var credentials_list;
app.post("/login_Credentials", (req, res) => {
  var message = {};
  credentials_list = req.body;
  con.query(
    `select Pass from ${credentials_list.User} where Email="${credentials_list.Email}"`,
    function (err, result) {
      if (result[0] == undefined) {
        message.status = 0;
        message.mess = "User Name or Password is wrong";
        res.send(message);
      } else {
        if (result[0].Pass == credentials_list.Password) {
          message.status = 1;
          message.mess = "Ok";
          req.session.UserId = credentials_list.Email;
          req.session.User = credentials_list.User;
          user_info.userid = req.session.UserId;
          user_info.user = req.session.User;
          res.send(message);
          con.query(
            `select * from ${req.session.User} where Email="${req.session.UserId}"`,
            function (err, result) {
              if (err) throw err;
              complete_user_inforamtion = result[0];
            }
          );
        } else {
          message.status = 0;
          message.mess = "User Name or Password is wrong";
          res.send(message);
        }
      }
    }
  );
});

app.post("/user_information_home", (req, res) => {
  res.send(JSON.stringify(complete_user_inforamtion));
});

//teacher_API's
app.post("/Class_Information", (req, res) => {
  con.query(
    `select Class_Id, Class_Name, Student_List from classes_table where Teacher_Email="${user_info.userid}"`,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});
app.post("/testing_assignment", (req, res) => {
  var class_id = req.body;
  con.query(
    `select * from Assignments_table where Class_Id="${class_id.Class_ID_req}"`,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});
app.post("/Add_Class", (req, res) => {
  class_req = req.body;
  con.query(
    `insert into classes_table values("${user_info.userid}",uuid()," ","${class_req.Class_Name}")`,
    (err, result) => {
      if (err) throw err;
      res.send();
    }
  );
});
var Not_Sub_list='';
app.post("/Add_Assignment", (req, res) => {
  assignment_req = req.body;
  console.log(assignment_req.Due_Date)
  res.send();
  function assignment_maker(variable) {
    con.query(
      `insert into assignments_table values("${assignment_req.Class_ID}",'${assignment_req.DESC}',"${assignment_req.Due_Date}",' ',' ','${variable}')`,
      (err, result) => {
        if (err) throw err;
        res.send();
      }
    );
  }
  con.query(
    `select Student_List from classes_table where Class_Id="${assignment_req.Class_ID}"`,
    async (err, result) => {
      if (err) throw err;
      if(Not_Sub_list){
        Not_Sub_list = result[0].Student_List;
      }
      assignment_maker(Not_Sub_list);
    }
  );
});
var class_joined_data = [];
app.post("/Classes_student1", (req, res) => {
  con.query(
    `select CLass_Enrolled from user_student where Email="${user_info.userid}"`,
    (err, result) => {
      if (err) throw err;
      var classes_joined = result[0].CLass_Enrolled.split(",");
      var i = 0;
      classes_joined.forEach((element) => {
        con.query(
          `select Class_Id, Class_Name from classes_table where CLass_Id="${element}"`,
          (err, resu) => {
            if (err) throw err;
            class_joined_data[i] = resu[0];
            i += 1;
          }
        );
      });
    }
  );
});
app.post("/Classes_student2", (req, res) => {
  res.send(class_joined_data);
});
app.post("/Checking_assignment_status", (req, res) => {
  body = req.body;
  con.query(
    `select Ontime_list, late_submitted, Not_submitted from assignments_table where Class_Id="${body.Class_ID_req}" and Discription="${body.DESC}";`,
    (err, result) => {
      if (err) throw err;
      var found = false;
      var assignment_data_list = {};
      list_ontime = result[0].Ontime_list.split(",");
      list_ontime.forEach((element) => {
        if (element.includes(user_info.userid)) {
          found = true;
          assignment_data_list.Status_A = "Submitted On Time";
          assignment_data_list.data = element.split("$");
        }
      });
      if (!found) {
        list_submitted = result[0].late_submitted.split(",");
        list_submitted.forEach((element) => {
          if (element.includes(user_info.userid)) {
            found = true;
            assignment_data_list.Status_A = "Late Submitted";
            assignment_data_list.data = element.split("$");
          }
        });
      }
      if (!found) {
        Not_submitted = result[0].Not_submitted.split(",");
        Not_submitted.forEach((element) => {
          if (element.includes(user_info.userid)) {
            found = true;
            assignment_data_list.Status_A = "Not Submitted";
            assignment_data_list.data = element.split("$");
          }
        });
      }
      res.send(assignment_data_list);
    }
  );
});
app.post("/Add_Class_Student", (req, res) => {
  body = req.body;
  con.query(
    `select Class_Enrolled from user_student where Email="${user_info.userid}"`,
    (err, result) => {
      if (err) throw err;
      var previous_classes = result[0].Class_Enrolled;
      previous_classes += "," + body.Class_Id;
      con.query(
        `select Not_submitted from assignments_table where Class_Id="${body.Class_Id}"`,
        (err, result) => {
          if (err) throw err;
          result.forEach((element) => {
            var previous_student_list = element.Not_submitted;
            previous_student_list += `,${user_info.userid}`;
            con.query(
              `update assignments_table set Not_submitted="${previous_student_list}" where Not_submitted="${element.Not_submitted}" and Class_Id="${body.Class_Id}"`,
              (err, result) => {
                if (err) throw err;
              }
            );
          });
        }
      );
      con.query(
        `update user_student set Class_Enrolled="${previous_classes}" where Email="${user_info.userid}"`,
        (err, result) => {
          if (err) throw err;
          res.send("okay");
        }
      );
    }
  );
});
var newpath = "";
app.post(
  "/submit_user_assignment",
  (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      newpath = "src/Mycomponents/files_folder/" + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.send("Your Assignment was Successfully Submitted");
      });
    });
    con.query(`select Not_submitted from assignments_table where Class_Id="${C_Id}" and discription="${DESC}"`,(err,result)=>{
      if(err) throw err;
      var old_list=result[0].Not_submitted.split(",")
      var new_list=''
      old_list.forEach(element => {
        if(element!=user_info.userid){
          new_list+=","+element
        }
      });
      con.query(`update assignments_table set Not_submitted="${new_list.slice(1,)}" where Class_Id="${C_Id}" and discription="${DESC}"`,(err,result)=>{
        if(err) throw err;
      })
    con.query(`select Ontime_list from assignments_table where Class_Id="${C_Id}" and discription="${DESC}"`,(err,result)=>{
      if(err) throw err;
      var O_list=result[0].Ontime_list
      O_list+=","+user_info.userid+"$"+current_date+"$"+newpath
      con.query(`update assignments_table set Ontime_list="${O_list}" where Class_Id="${C_Id}" and discription="${DESC}"`,(err,result)=>{
        if(err) throw err;
      })
    })
    })
  }
  
);
var current_date;
var C_Id
var DESC
app.post("/submit_user_assignment2", (req, res) => {
  body = req.body;
  C_Id=body.Class_Id
  DESC=body.DESC
  let year = date_ob.getFullYear();
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let date = ("0" + date_ob.getDate()).slice(-2);
  current_date = year + "-" + month + "-" + date;
  res.send("done");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
