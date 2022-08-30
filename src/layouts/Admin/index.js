import React, { useState, useRef } from "react";
import NavBar from "components/navBar";
import "assets/styles/admin.css";
import cookie from "react-cookies";
import axios from "axios";

export default function Admin() {
  const [email, setEmail] = useState("");
  const emailRef = useRef(null);

  async function Block_user() {
    try {
      console.log(cookie.load("token"));
      const res = await axios.put(
        "http://localhost:80/api/users/block/" + email,
        null,
        {
          headers: {
            Authorization: cookie.load("token"),
          },
        }
      );
      console.log(res.data.success);
      alert("successful = " + (res.data.success === true));
    } catch (err) {
      alert("unexpected error");
    }
    emailRef.current.value = "";
  }
  async function Delete_user() {
    try {
      console.log(cookie.load("token"));
      const res = await axios.delete("http://localhost:80/api/users/" + email, {
        headers: {
          Authorization: cookie.load("token"),
        },
      });
      console.log(res.data.success);
      alert("successful = " + (res.data.success === true));
    } catch (err) {
      alert("unexpected error");
    }
    emailRef.current.value = "";
  }
  async function Unblock_user() {
    try {
      console.log(cookie.load("token"));
      const res = await axios.put(
        "http://localhost:80/api/users/unblock/" + email,
        null,
        {
          headers: {
            Authorization: cookie.load("token"),
          },
        }
      );
      console.log(res.data.success);
      alert("successful = " + (res.data.success === true));
    } catch (err) {
      alert("unexpected error");
    }
    emailRef.current.value = "";
  }

  function emailChange(e) {
    setEmail(e.target.value);
  }
  return (
    <div class="container-fluid p-0" style={{ overflowX: "hidden" }}>
      <NavBar />
      <div className="row">
        <main class="col-12">
          <div style={{ marginTop: "100px" }}>
            <h1>Welcome dear admin!</h1>
          </div>

          <div style={{ marginTop: "100px" }}>
            <main className="form-signin">
              <form>
                <div className="form-floating ">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    onChange={emailChange}
                    ref={emailRef}
                    required
                  />
                  <label>Email address</label>
                </div>
                <button
                  className="w-100 btn btn-lg btn-danger mt-3"
                  onClick={Block_user}
                >
                  Block
                </button>
                <button
                  className="w-100 btn btn-lg btn-success mt-3"
                  onClick={Unblock_user}
                >
                  Unblock
                </button>
                <button
                  className="w-100 btn btn-lg btn-danger mt-3"
                  onClick={Delete_user}
                >
                  Delete
                </button>
              </form>
            </main>
          </div>
        </main>
      </div>
    </div>
  );
}
