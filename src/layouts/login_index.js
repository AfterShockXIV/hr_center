import '../CSS/login.css'; //css
import { useState } from "react";
import swal from 'sweetalert';
const Login_index = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const server = "http://192.168.30.227:5000/";

  async function loginUser(credentials) {
    return fetch(server + 'Check_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
  }
  const Check_login = async event => {
    event.preventDefault();
    const response = await loginUser({
      username,
      password
    });
    if ('accessToken' in response) {
      swal("Success", "User Login : " + response.status, "success", {
        buttons: false,
        timer: 2200,
      })
        .then((value) => {
          localStorage.setItem('accessToken', response['accessToken']);
          localStorage.setItem('status', JSON.stringify(response['status']));
          localStorage.setItem('member_id', JSON.stringify(response['member_id']));
          window.location.href = "/";
        });
    } else {
      swal("Login Failed", response.message, "error");
    }
  };
  return (
    <body>

      <div class="wrapper_login fadeInDown">
        <div id="formContent">
          <div class="fadeIn first">
            <img src={require("assets/img/login.png").default} id="icon" alt="User Icon" /><br />
          </div>
          <br />
          <form onSubmit={Check_login} >
            <input required type="text" id="login" class="fadeIn second username_text" name="user_email" placeholder="Username" 
              onChange={(event) => {
                setUsername(event.target.value)
              }}
            />
            <input required type="password" id="password" class="fadeIn third" name="user_pass" placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value)
              }}
            />

            <input style={{ marginTop: "20px", backgroundColor: "gray" }} type="submit" class="fadeIn fourth" value="LogIn"

            />
          </form>
        </div>
      </div>
    </body>
  );
}
export default Login_index;