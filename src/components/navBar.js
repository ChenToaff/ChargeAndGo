import { useNavigate } from "react-router-dom";
import inactiveIcon from "assets/images/notification_inactive.png";
import activeIcon from "assets/images/notification_active.png";
export default function NavBar() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("admin") === "true";
  const notifications = localStorage.getItem("notifications") === "true";

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    //navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow
    <header
      className="navbar navbar-light navbar-expand-md sticky-top p-0"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <a
        className="navbar-brand"
        href="/"
        style={{
          backgroundColor: "#e3f2fd",
          boxShadow: "none",
          paddingLeft: "7px",
        }}
      >
        Charge&Go
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup, #sidebarMenu"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link" href="profile">
            Profile
          </a>
          {isAdmin == true && (
            <a className="nav-item nav-link" href="Admin">
              Admin
            </a>
          )}
          <a className="nav-item nav-link" href="" onClick={logout}>
            Logout
          </a>
        </div>
        <a href="notifications">
          <img
            style={{ height: "25px", width: "25px", cursor: "pointer" }}
            src={notifications ? activeIcon : inactiveIcon}
            onClick={() => {
              localStorage.removeItem("notifications");
            }}
          />
        </a>
      </div>
    </header>
  );
}
