import "assets/styles/stars.css";
import logo from "assets/images/charging_tab.jpg";

export default function StationTab({
  station,
  setSelectedStation,
  selectedStation,
}) {
  function tabClicked(e) {
    if (selectedStation && selectedStation._id === station._id)
      setSelectedStation(null);
    else {
      setSelectedStation(station);
    }
  }

  return (
    <a
      href="#"
      onClick={tabClicked}
      className={
        "list-group-item list-group-item-action py-3 lh-tight p-4 " +
        (selectedStation && selectedStation._id === station._id ? "active" : "")
      }
      aria-current="true"
    >
      <div className="d-flex w-100  justify-content-between">
        <img src={logo} style={{ width: "50px", height: "50px" }}></img>
        <strong className="mb-1">{station.address}</strong>
        <div
          className="stars"
          style={{ "--w": `${(station.rating / 5) * 100}%`, marginLeft: "0" }}
        ></div>
      </div>
    </a>
  );
}
