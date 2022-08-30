import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "assets/styles/login.css";

export default function SignUpAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function signup(e) {
    e.preventDefault();
    axios
      .post("http://localhost:80/api/users/register-admin", {
        email: email,
        password: password,
        phone: phone,
        name: userName,
      })
      .then(navigate("/home"))
      .catch((err) => {
        setError(true);
      });
  }

  function emailChange(e) {
    setEmail(e.target.value);
  }
  function passwordChange(e) {
    setPassword(e.target.value);
  }
  function phoneChange(e) {
    setPhone(e.target.value);
  }
  function userNameChange(e) {
    setUserName(e.target.value);
  }
  return (
    <main className="form-signin">
      <form onSubmit={signup}>
        <a href="/home">
          <img
            className="mb-4"
            src="home_logo.png"
            alt=""
            width="80%"
            height="80%"
          />
        </a>

        <h1 className="h3 mb-3 fw-normal">Please sign Up As Admin</h1>

        <div className="form-floating">
          <input
            className="form-control"
            id="userName"
            placeholder="name@example.com"
            onChange={userNameChange}
            required
          />
          <label>Name</label>
        </div>
        <div className="form-floating">
          <input
            type="phone"
            className="form-control"
            id="phone"
            placeholder="name@example.com"
            onChange={phoneChange}
            required
          />
          <label>Phone</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
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
            // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
          >
            {/* <div></div> */}
          </input>
          <label>Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign Up
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
