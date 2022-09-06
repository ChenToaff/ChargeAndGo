import React, { useState, useEffect } from "react";
import EditProfile from "./editProfile";
import MapView from "features/map";
import NavBar from "components/navBar";
import Sidebar from "components/sidebar";
import axios from "axios";
const config = require("config.json");

export default function Profile() {
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedItem, setSelectedItem] = useState({ id: 2 });
  const [stations, setStations] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.base_url}stations/`)
      .then((res) => setStations(res.data))
      .catch((err) => {
        // setError(true);
      });
  }, []);

  return (
    <div class="container-fluid p-0" style={{ overflowX: "hidden" }}>
      <NavBar />
      <div className="row">
        <Sidebar
          selectedItem={selectedItem}
          items={[
            {
              id: 1,
              label: "edit profile",
              handleClick: function () {
                setSelectedItem(this);
              },
            },
            {
              id: 2,
              label: "my stations",
              handleClick: function () {
                setSelectedItem(this);
              },
            },
          ]}
        />
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          {selectedItem && selectedItem.id === 1 ? (
            <EditProfile></EditProfile>
          ) : (
            <div style={{ width: "80vw", height: "90vh", margin: "auto" }}>
              <MapView
                stations={stations}
                setSelectedStation={setSelectedStation}
                selectedStation={selectedStation}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
