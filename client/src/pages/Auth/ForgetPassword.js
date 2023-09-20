import React, { useRef, useState } from "react";
import classes from "./SignIn.module.css";
import { NavLink } from "react-router-dom";
import {useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import EmailSentMessage from "./EmailSentMessage";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";

const ForgetPassword = () => {
  const theme = useSelector((state) => state.userSettingReducer.theme);
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState("");
  const [emailsent, setEmailSent] = useState(false);
  const emailref = useRef();

  async function ForgetPassHandler(e) {
    e.preventDefault();
    setLoaded(false);
    setError("");
    try {
      await axios.post(
        "http://localhost:5000/password/forgotpassword/" +
          emailref.current.value
      );
      setLoaded(true);
      setEmailSent(true);
    } catch (err) {
      setEmailSent(false);
      setLoaded(true);
      setError(err.response.data.message);
    }
  }

  return emailsent ? (
    <EmailSentMessage />
  ) : loaded ? (
    <>
      <Header />
      <div className={classes["container"]}>
        <form onSubmit={ForgetPassHandler}>
          <div className={classes["login-box"]}>
            <div className={classes["login-header"]}>
              <header className={`text-${theme === "dark" ? "light" : "dark"}`}>
                Forget Password
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
                Send Mail
              </label>
            </div>

            <div className={classes["sign-up-link"]}>
              <NavLink
                to="/signin"
                className={`text-${theme === "dark" ? "light" : "dark"}`}
              >
                <p className={`text-${theme === "dark" ? "light" : "dark"}`}>
                  Click here to Sign In
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

export default ForgetPassword;
