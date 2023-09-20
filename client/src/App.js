import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import ActivateAccount from "./pages/Auth/ActivateAccount";
import Home from "./pages/Home/Home";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import lightback from "./lightbackground.jpg";
import darkback from "./darkbackground.jpg";
import { getallgroup } from "./actions/GroupActions";

function App() {
  const theme = useSelector((state) => state.userSettingReducer.theme);
  const user = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  useEffect(() => {
    document.body.style.backgroundImage =
      theme === "dark" ? `url(${darkback})` : `url(${lightback})`;
  }, [theme]);
  useEffect(() => {
    if(user){
      dispatch(getallgroup(user.token));
    }
  }, [user]);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="../signin" />}
        />
        <Route
          path="/signin"
          element={user ? <Navigate to="../" /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="../" /> : <SignUp />}
        />
        <Route
          path="/forgetpass"
          element={user ? <Navigate to="../" /> : <ForgetPassword />}
        />
        <Route
          path="/activateaccount/:id"
          element={user ? <Navigate to="../" /> : <ActivateAccount />}
        />
        <Route
          path="/resetpassword/:id"
          element={user ? <Navigate to="../" /> : <ResetPassword />}
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
