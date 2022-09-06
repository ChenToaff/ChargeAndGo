import React, { useState } from "react";
import axios from "axios";
const config = require("config.json");

export default function AddStation({ touchedMap }) {
  const [stationType, setStationType] = useState("A");
  const [address, setAddress] = useState("");

  function handleClick(e) {
    e.preventDefault();
    axios
      .post(
        `${config.base_url}stations/register-station`,
        {
          longitude: parseFloat(touchedMap.lng),
          latitude: parseFloat(touchedMap.lat),
          address: address,
          stationtype: stationType,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(() => window.location.reload(false))
      .catch(() => {
        // setError(true);
      });
  }

  return (
    <form
      onSubmit={handleClick}
      className=""
      style={{
        marginLeft: "20px",
        width: "160px",
        height: "160px",
        overflow: "initial",
        marginTop: "10px",
      }}
    >
      <label>Enter Address:</label>

      <input
        className="m-auto form-control"
        placeholder="Address"
        onChange={(e) => setAddress(e.target.value)}
        required
      ></input>
      <label>Select Type:</label>
      <select
        class="form-select"
        aria-label="Default select example"
        onChange={(e) => setStationType(e.target.value)}
      >
        <option selected value={stationType}>
          A
        </option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </select>
      <br></br>
      <button type="submit" className="btn m-auto btn-primary">
        Add Station
      </button>
    </form>
  );
}
