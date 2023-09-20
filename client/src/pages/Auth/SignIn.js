import React, { useRef, useState } from "react";
import classes from "./SignIn.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../actions/AuthActions";
import Header from "../../components/Header/Header";
import Spinner from "../../components/Spinner/Spinner";
const Login = () => {
  const theme = useSelector((state) => state.userSettingReducer.theme);
  const passwordref = useRef();
  const emailref = useRef();
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  async function loginhandler(e) {
    e.preventDefault();
    setLoaded(false);
    setError("");
    const myobj = {
      email: emailref.current.value,
      password: passwordref.current.value,
    };
    console.log(myobj);
    try {
      await dispatch(signIn(myobj));
      setLoaded(true);
    } catch (err) {
      setLoaded(true);
      setError(err.message);
    }
  }
  return loaded ? (
    <>
      <Header />
      <div className={classes["container"]}>
        <form onSubmit={loginhandler}>
          <div className={classes["login-box"]}>
            <div className={classes["login-header"]}>
              <header className={`text-${theme === "dark" ? "light" : "dark"}`}>
                Sign In
              </header>
            </div>
            <div className={classes["input-box"]}>
              <input
                type="email"
                className={classes["input-field"]}
                placeholder="Email"
                autoComplete="off"
                ref={emailref}
                required
              />
            </div>
            <div className={classes["input-box"]}>
              <input
                type="password"
                className={classes["input-field"]}
                placeholder="Password"
                autoComplete="off"
                ref={passwordref}
                required
              />
            </div>
            <section>
              <NavLink
                to="/forgetpass"
                className={`text-${theme === "dark" ? "light" : "dark"}`}
                style={{ textDecoration: "none", marginBottom: "10px" }}
              >
                Forgot password
              </NavLink>
            </section>
            <header className="text-danger">{error}</header>
            <div className={classes["input-submit"]}>
              <button
                type="submit"
                id="submit-btn"
                className={`${classes["submit-btn"]} bg-${
                  theme === "dark" ? "light" : "dark"
                }`}
              ></button>
              <label className={`text-${theme}`} htmlFor="submit-btn">
                Sign In
              </label>
            </div>

              <div className={classes["sign-up-link"]}>
              <NavLink
              to="/signup"
              className={`text-${theme === "dark" ? "light" : "dark"}`}
            >
                <p className={`text-${theme === "dark" ? "light" : "dark"}`}>
                  Don't have account? Sign Up
                </p>
            </NavLink>
              </div>
          </div>
        </form>
      </div>
    </>
  ) : (
    <Spinner />
  );
};

export default Login;
