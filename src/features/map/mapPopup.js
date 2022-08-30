import React, { useState, useEffect } from "react";
import axios from "axios";
import cookie from "react-cookies";
import "assets/styles/stars.css";

export default function MapPopup({ station }) {
  const [orders, setOrders] = useState([]);
  const [startTime, SetstartTime] = useState(null);
  const [startDate, SetstartDate] = useState(null);
  const [endTime, SetEndTime] = useState(null);
  const [endDate, SetEndDate] = useState(null);
  const [error, setError] = useState(null);
  const [errorText, setErrorText] = useState("Order failed!");

  useEffect(async () => {
    console.log(station.orders);
    try {
      const res = await axios.get(
        "http://localhost:80/api/orders/" + station._id,
        {
          headers: {
            Authorization: cookie.load("token"),
          },
        }
      );
      setError(false);
      setOrders(res.data.orders);
    } catch (err) {
      setErrorText("Order failed!");
      setError(true);
    }
  }, [station, orders.length]);
  useEffect(async () => {}, [error, errorText]);

  async function bookStation() {
    if (!startDate || !startTime || !endDate || !endTime) {
      setErrorText("Missing Fields!");
      setError(true);
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:80/api/orders/station/" + station._id,
        {
          startTime: `${startDate} ${startTime}`,
          endTime: `${endDate} ${endTime}`,
        },
        {
          headers: {
            Authorization: cookie.load("token"),
          },
        }
      );
      if (!res.data.success) {
        throw new Error();
      }
      setOrders([
        ...orders,
        {
          startTime: `${startDate} ${startTime}`,
          endTime: `${endDate} ${endTime}`,
        },
      ]);
    } catch (err) {
      setErrorText("Order failed!");

      setError(true);
    }
  }
  function startTimeChange(e) {
    SetstartTime(e.target.value);
  }
  function startDateChange(e) {
    SetstartDate(e.target.value);
  }
  function endTimeChange(e) {
    SetEndTime(e.target.value);
  }
  function endDateChange(e) {
    SetEndDate(e.target.value);
  }

  return (
    <div
      style={{
        marginLeft: "20px",
        width: "300px",
        height: "500px",
        overflow: "initial",
        marginTop: "10px",
      }}
    >
      <h2>{station.address}</h2>
      <div
        class="stars"
        style={{ "--w": `${(station.rating / 5) * 100}%` }}
      ></div>
      <h6 style={{ textAlign: "left" }}>
        Numer of Ratings: {station.num_of_ranks}
      </h6>
      <h6 style={{ textAlign: "left" }}>Type: {station.stationtype}</h6>

      <label>select start date: </label>
      <div inline="true">
        <input type="time" onChange={startTimeChange} />{" "}
        <input type="date" onChange={startDateChange} />
      </div>
      <label>select end date: </label>
      <div inline="true">
        <input type="time" onChange={endTimeChange} />{" "}
        <input type="date" onChange={endDateChange} />
      </div>
      <label>current orders:</label>
      <div style={{ height: "200px", overflowY: "scroll" }}>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr>
                <th scope="row">{index}</th>
                <td>{`${new Date(
                  order.startTime
                ).toLocaleDateString()} ${new Date(
                  order.startTime
                ).toLocaleTimeString()}`}</td>
                <td>{`${new Date(
                  order.endTime
                ).toLocaleDateString()} ${new Date(
                  order.endTime
                ).toLocaleTimeString()}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={bookStation} className="btn btn-primary mt-1 mb-1">
        Book Station
      </button>
      <div
        className={
          "alert alert-danger m-1  p-2 " + (error ? "d-block" : "d-none")
        }
        role="alert"
      >
        {errorText}
      </div>
    </div>
  );
}
