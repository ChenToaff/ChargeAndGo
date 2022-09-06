import React, { useState, useEffect } from "react";
import axios from "axios";
import "assets/styles/stars.css";
const config = require("config.json");

export default function MapPopup({ station }) {
  const [orders, setOrders] = useState([]);
  const [startTime, SetstartTime] = useState(null);
  const [startDate, SetstartDate] = useState(null);
  const [endTime, SetEndTime] = useState(null);
  const [endDate, SetEndDate] = useState(null);
  const [error, setError] = useState(null);
  const [errorText, setErrorText] = useState("Order failed!");

  useEffect(() => {
    console.log(station.orders);
    axios
      .get(`${config.base_url}orders/${station._id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setError(false);
        setOrders(res.data.orders);
      })
      .catch(() => {
        setErrorText("Order failed!");
        setError(true);
      });
  }, [station, orders.length]);

  function bookStation() {
    if (!startDate || !startTime || !endDate || !endTime) {
      setErrorText("Missing Fields!");
      setError(true);
      return;
    }
    axios
      .post(`${config.base_url}orders/station/${station._id}`, {
        startTime: `${startDate} ${startTime}`,
        endTime: `${endDate} ${endTime}`,
      })
      .then(
        setOrders([
          ...orders,
          {
            startTime: `${startDate} ${startTime}`,
            endTime: `${endDate} ${endTime}`,
          },
        ])
      )
      .catch(() => {
        setErrorText("Order failed!");
        setError(true);
      });
  }

  return (
    <div
      style={{
        marginLeft: "20px",
        width: "300px",
        height: "500px",
        overflow: "initial",
        marginTop: "10px",
        textAlign: "center",
      }}
    >
      <h2>{station.address}</h2>
      <div
        className="stars"
        style={{ "--w": `${(station.rating / 5) * 100}%` }}
      ></div>
      <h6 style={{ textAlign: "left" }}>
        Numer of Ratings: {station.num_of_ranks}
      </h6>
      <h6 style={{ textAlign: "left" }}>Type: {station.stationtype}</h6>

      <label>select start date: </label>
      <div inline="true">
        <input type="time" onChange={(e) => SetstartTime(e.target.value)} />{" "}
        <input type="date" onChange={(e) => SetstartDate(e.target.value)} />
      </div>
      <label>select end date: </label>
      <div inline="true">
        <input type="time" onChange={(e) => SetEndTime(e.target.value)} />{" "}
        <input type="date" onChange={(e) => SetEndDate(e.target.value)} />
      </div>
      <label>current orders:</label>
      <div style={{ height: "200px", overflowY: "scroll" }}>
        <table className="table">
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
