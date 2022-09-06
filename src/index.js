import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Notifications from "layouts/Notifications";
import SignUpAdmin from "layouts/SignupAdmin";
import Profile from "layouts/Profile";
import SignUp from "layouts/Signup";
import Login from "layouts/Login";
import Admin from "layouts/Admin";
import Home from "layouts/Home";
import { CheckAdmin, CheckLogin } from "components/protectedRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup-Admin" element={<SignUpAdmin />} />

        <Route element={<CheckLogin />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
        <Route element={<CheckAdmin />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
