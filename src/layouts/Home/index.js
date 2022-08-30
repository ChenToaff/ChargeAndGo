import React, { useState, useEffect } from "react";
import "assets/styles/home.css";
import MapView from "features/map";
import TabView from "./tabView";
import NavBar from "components/navBar";
import axios from "axios";
import cookie from "react-cookies";

export default function Home() {
  const [selectedStation, setSelectedStation] = useState(null);
  const [stations, setStations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:80/api/stations/all", {
        headers: {
          Authorization: cookie.load("token"),
        },
      })
      .then((res) => {
        setStations(res.data);
      })
      .catch((err) => {
        // setError(true);
      });
  }, []);

  return (
    <div class="container-fluid p-0 " style={{ overflowX: "hidden" }}>
      <NavBar />
      <div className="row flex-grow-1" style={{ height: "93%" }}>
        <div className="col-sm-12 col-md-3 p-0 h-100">
          <TabView
            stations={stations}
            setSelectedStation={setSelectedStation}
            selectedStation={selectedStation}
          />
        </div>
        <div
          className="col-sm-12 col-md-9 p-0 h-100"
          style={{ overflowY: "scroll" }}
        >
          <MapView
            stations={stations}
            setSelectedStation={setSelectedStation}
            selectedStation={selectedStation}
          />
        </div>
      </div>
    </div>
  );
}
