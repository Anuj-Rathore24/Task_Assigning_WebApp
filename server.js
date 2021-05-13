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

  
app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.send("Connected Successfully")
});
app.post("/post2", (req, res) => {
  console.log("Done");
});
  
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));