const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const authRoute = require("./src/routes/auth");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, "public"))); // configure express to use public folder
app.use(express.urlencoded({ extended: false }));
const bcrypt = require("bcryptjs");
const oneDay = 1000 * 60 * 60 * 24;
const session = require("express-session");
app.use(
  session({
    secret: "secret_session",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay }
  })
);
app.use(authRoute);

const port = 5000;

//Database Connect
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "datawebbet",
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});
global.db = db;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

app.get("/getApi/getdata", (req, res) => {
  db.query("SELECT * FROM login_data ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send([result[0]]);
    }
  });
});

app.post("/postApi/Login/Checklogin", (req, res) => {
  async function Check_login() {
    let { username, password } = req.body;
    bcrypt.hash(username, 10, (err, tokentext) => {
      // console.log(tokentext);
      let data =
        "select * from login_data where username = '" +
        username +
        "' and password = '" +
        password +
        "' ";
      db.query(data, (err, result) => {
        // console.log(result);
        if (err) {
          console.log(err);
        } else {
          // console.log("suc" + result.length);
          if (result.length === 0) {
            res.send({
              status: "error",
              message: "ตรวจสอบ Username หรือ Password",
            });
          } else {
            req.session.username = result[0].username;
            console.log(req.session.username );
            res.send({
              status: "ok",
              message: "Logged in",
              accessToken: tokentext,
              name: result[0].name,
              login_id: result[0].login_id,
              session_login: true,
            });
          }
        }
      });
    });
  }
  Check_login();
});