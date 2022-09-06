import "assets/styles/home.css";
import NavBar from "components/navBar";

export default function Notifications() {
  const notifications_arr = ["התראה 1", "התראה 2", "התראה 3"];
  return (
    <div className="container-fluid p-0" style={{ overflowX: "hidden" }}>
      <NavBar />

      <div className="row w-75 m-auto p-5">
        {notifications_arr.map((noti) => (
          <div className="alert alert-info" role="alert">
            {noti}
          </div>
        ))}
      </div>
    </div>
  );
}
