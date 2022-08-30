import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import "assets/styles/login.css";
import logo from "assets/images/home_logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:80/api/users/login", {
        email: email,
        password: password,
      });
      console.log(res);
      const token = res.data.token;
      const role = res.data.role;
      cookie.save("token", token);
      cookie.save("admin", role === "admin");
      // cookie.save("notifications", res.data.notifications.length > 0);
      cookie.save("notifications", true);
      navigate("/home");
    } catch (err) {
      setError(true);
    }
  }

  function emailChange(e) {
    setEmail(e.target.value);
  }

  function passwordChange(e) {
    setPassword(e.target.value);
  }
  return (
    <main className="form-signin">
      <form onSubmit={login}>
        <img className="mb-4" src={logo} alt="" width="80%" height="80%" />
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            // type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            onChange={emailChange}
            required
          />
          <label>Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={passwordChange}
            required
            title=" merki"
            // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
          >
            {/* <div></div> */}
          </input>
          <label>Password</label>
        </div>

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
          <br></br>
          <a href="signup">sign up here!</a>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
        <div
          className={
            "alert alert-danger m-1  p-2 " + (error ? "d-block" : "d-none")
          }
          role="alert"
        >
          Connection failed!
        </div>
      </form>
    </main>
  );
}
