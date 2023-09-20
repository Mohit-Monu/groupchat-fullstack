
import React, { useEffect, useRef, useState } from "react";
import classes from "./SignIn.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";

const ResetPassword = () => {
  const theme = useSelector((state) => state.userSettingReducer.theme);
  const refNewPassword = useRef();
  const refNewPassword2 = useRef();
  const navigate = useNavigate();
  const uuid = useParams().id;
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState("");  
  useEffect(() => {
    async function getData() {
      try {
        await axios.get("http://localhost:5000/password/resetpassword/" + uuid);
      } catch (err) {
        navigate("../pagenotfound");
      }
    }
    getData();
  }, [uuid, navigate]);
  async function ChangePassHandler(e) {
    e.preventDefault();
    if (refNewPassword.current.value !== refNewPassword2.current.value) {
      setError("Password does not match");
      return;
    }
    setLoaded(false);
    setError("");
    try {
      const config = {
        method: "POST",
        url: "http://localhost:5000/password/createpass",
        data: {
          uuid: uuid,
          newpass: refNewPassword.current.value,
        },
      };
      const data = await axios(config);
      setLoaded(true);
      console.log(data);
      setError(data.data.message);
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (err) {
      setLoaded(true);
      setError(err.response.data.message);
    }
  }

  return loaded ? (
    <>
      <Header />
      <div className={classes["container"]}>
        <form onSubmit={ChangePassHandler}>
          <div className={classes["login-box"]}>
            <div className={classes["login-header"]}>
              <header className={`text-${theme === "dark" ? "light" : "dark"}`}>
                Change Password
              </header>
            </div>
            <div className={classes["input-box"]}>
              <input
                type="password"
                className={classes["input-field"]}
                placeholder="Create Password"
                autoComplete="off"
                ref={refNewPassword}
                required
              />
            </div>
            <div className={classes["input-box"]}>
              <input
                type="password"
                className={classes["input-field"]}
                placeholder="Confirm Password"
                autoComplete="off"
                ref={refNewPassword2}
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
                Change Password
              </label>
            </div>
          </div>
        </form>
      </div>
    </>
  ) : (
    <Spinner />
  );
};

export default ResetPassword;
