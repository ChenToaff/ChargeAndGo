import React, { useState } from "react";
import axios from "axios";
import cookie from "react-cookies";

export default function AddStation({ touchedMap }) {
  const [stationType, setStationType] = useState("A");
  const [address, setAddress] = useState("");

  async function handleClick() {
    try {
      const res = await axios.post(
        "http://localhost:80/api/stations/register-station",
        {
          longitude: parseFloat(touchedMap.lng),
          latitude: parseFloat(touchedMap.lat),
          address: address,
          stationtype: stationType,
        },
        {
          headers: {
            Authorization: cookie.load("token"),
          },
        }
      );
    } catch (err) {
      // setError(true);
    }
  }
  function addressChange(e) {
    setAddress(e.target.value);
  }
  function stationTypeChange(e) {
    setStationType(e.target.value);
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
        id="address"
        className="m-auto form-control"
        placeholder="Address"
        onChange={addressChange}
        required
      ></input>
      <label>Select Type:</label>
      <select
        id="stationType"
        class="form-select"
        aria-label="Default select example"
        onChange={stationTypeChange}
      >
        <option selected value="A">
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
