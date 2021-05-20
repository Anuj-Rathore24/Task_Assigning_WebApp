const express = require("express");
const app = express();
const cors = require("cors");

//cors libarary is for handling security messages from browser(while using xhttp requests)
app.use(cors());

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
    saveUninitialized: false,
    resave: false,
    secret: "auth",
    Cookie: {
      sameSite: true,
      secure: false,
    },
  })
);
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
      complete_user_inforamtion = Credentials;
      console.log(complete_user_inforamtion);
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
      if (result[0]==undefined) {
        message.status = 0;
        message.mess = "User Name or Password is wrong";
        res.send(message)
      } else {
        if (result[0].Pass == credentials_list.Password) {
          message.status = 1;
          message.mess = "Ok";
          req.session.UserId = credentials_list.Email;
          req.session.User = credentials_list.User;
          res.send(message)
          con.query(
            `select * from ${credentials_list.User} where Email="${credentials_list.Email}"`,
            function (err, result) {
              if (err) throw err;
              complete_user_inforamtion = result[0];
              console.log(complete_user_inforamtion);
            }
          );
        } else {
          message.status = 0;
          message.mess = "User Name or Password is wrong";
          res.send(message)
        }
      }
    }
  );
});

app.post("/user_information_home", (req, res) => {
  res.send(JSON.stringify(complete_user_inforamtion));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
