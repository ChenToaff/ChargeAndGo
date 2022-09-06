import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "assets/styles/login.css";
const config = require("config.json");

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
      .post(`${config.base_url}users/register-admin`, {
        email: email,
        password: password,
        phone: phone,
        name: userName,
      })
      .then(navigate("/home"))
      .catch((err) => setError(true));
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
            placeholder="name@example.com"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <label>Name</label>
        </div>
        <div className="form-floating">
          <input
            type="phone"
            className="form-control"
            placeholder="name@example.com"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <label>Phone</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
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
