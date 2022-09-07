import React, { useState } from "react";
import NavBar from "components/navBar";
import "assets/styles/admin.css";
import axios from "axios";
const config = require("config.json");

export default function Admin() {
  const [email, setEmail] = useState("");

  function Block_user() {
    axios
      .put(`${config.base_url}users/block/` + email, null, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => alert("successful = " + (res.data.success === true)))
      .catch(() => alert("unexpected error"));

    setEmail("");
  }
  function Delete_user() {
    axios
      .delete(`${config.base_url}users/` + email, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => alert("successful = " + (res.data.success === true)))
      .catch(() => {
        alert("unexpected error");
      });
    setEmail("");
  }
  function Unblock_user() {
    axios
      .put(`${config.base_url}users/unblock/` + email, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => alert("successful = " + (res.data.success === true)))
      .catch(() => alert("unexpected error"));
    setEmail("");
  }

  return (
    <div className="container-fluid p-0" style={{ overflowX: "hidden" }}>
      <NavBar />
      <div className="row text-center">
        <main className="col-12">
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
                    value={email}
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
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
