/* eslint-disable no-undef */
const bcrypt = require("bcryptjs");

const Checklogin = (req, res, next) => {
async function Check_login() {
    let {username , password} = req.body
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
            req.session['username'] = username
            res.send({
              status: "ok",
              message: "Logged in",
              accessToken: tokentext,
              name: result[0].name,
              login_id: result[0].login_id,
              session_login: true
            });
          }
        }
      });
    });
  }
  Check_login();
}
module.exports.Checklogin = Checklogin;