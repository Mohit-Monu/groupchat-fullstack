import React, { useRef, useState } from "react";
import classes from "./SignIn.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../actions/AuthActions";
import Header from "../../components/Header/Header";
import ActivateConfirmEmail from "./ActivateConfirmEmail";
import Spinner from "../../components/Spinner/Spinner";
const Login = () => {
  const theme = useSelector((state) => state.userSettingReducer.theme);
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState("");
  const [signUpSuccess, SetSignUpSuccess] = useState(false);
  const dispatch = useDispatch();
  const nameref = useRef();
  const emailref = useRef();
  const passwordref = useRef();

  async function SignUpHandler(e) {
    e.preventDefault();
    setLoaded(false);
    setError("");
    const myobj = {
      name: nameref.current.value,
      email: emailref.current.value,
      password: passwordref.current.value,
    };
    console.log(myobj);
    try {
      const data = await dispatch(signUp(myobj));
      setLoaded(true);
      setError(data.message);
      SetSignUpSuccess(true);
    } catch (err) {
      setLoaded(true);
      setError(err.message);
    }
  }
  return signUpSuccess ? (
    <ActivateConfirmEmail />
  ) : loaded ? (
    <>
      <Header />
      <div className={classes["container"]}>
        <form onSubmit={SignUpHandler}>
          <div className={classes["login-box"]}>
            <div className={classes["login-header"]}>
              <header className={`text-${theme === "dark" ? "light" : "dark"}`}>
                Sign Up
              </header>
            </div>
            <div className={classes["input-box"]}>
              <input
                type="text"
                className={classes["input-field"]}
                placeholder="Name"
                autoComplete="off"
                ref={nameref}
                required
              />
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
            <header className="text-danger">{error}</header>
            <div className={classes["input-submit"]}>
              <button
                type="submit"
                id="submit-btn"
                className={`${classes["submit-btn"]} bg-${
                  theme === "dark" ? "light" : "dark"
                }`}
              ></button>
              <label htmlFor="submit-btn" className={`text-${theme}`}>
                Sign Up
              </label>
            </div>

            <div className={classes["sign-up-link"]}>
              <NavLink
                to="/signin"
                className={`text-${theme === "dark" ? "light" : "dark"}`}
              >
                <p className={`text-${theme === "dark" ? "light" : "dark"}`}>
                  Already have an account? Sign In
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
