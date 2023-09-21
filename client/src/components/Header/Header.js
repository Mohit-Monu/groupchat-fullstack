import React, { useState } from "react";
import classes from "./Header.module.css";
import photo from "./photo.png";
import { Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { ChangeTheme } from "../../actions/UserActions";
import userpic from "./usericon.png";
import { logOut } from "../../actions/AuthActions";
const Header = (props) => {
  const theme = useSelector((state) => state.userSettingReducer.theme);
  const user = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();
  function themeHandler() {
    dispatch(ChangeTheme());
  }
  const [showAccountName, setShowAccountName] = useState(false);
  const toggleAccountName = () => {
    setShowAccountName(!showAccountName);
  };
  function LogOutHandler(){
    dispatch(logOut())
  }

  return (
    <>
      <div
        className={`${classes.parent}`}
        style={{
          borderBottom: `2px solid ${theme === "dark" ? "white" : "black"}`,
        }}
      >
        <div className={` ${classes.box}`}>
          <Image fluid src={photo} />
          <h3 className={`text-${theme === "dark" ? "light" : "dark"}`}>
            Chat
          </h3>
        </div>
        <div className={` ${classes.box2}`}>
          {user.authData && (
            <div className={classes.userPicContainer} >
            <img
              className={classes.userpic}
              src={
                user && user.authData && user.authData.user.profilePic
                  ? user.authData.user.profilePic
                  : userpic
              }
              alt="User Profile"
              onClick={toggleAccountName}
            />
            </div>
          )}
          <Form>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              onClick={themeHandler}
            />
          </Form>
          {!props.isSmallScreen && <Image fluid src={photo} />}

        </div>
        {showAccountName && (
              <div  className={`${classes.accountNameBar} bg-${theme}`}style={{
                borderBottom: `2px solid ${theme === "dark" ? "white" : "black"}`,
                borderLeft: `2px solid ${theme === "dark" ? "white" : "black"}`,
                borderRight: `2px solid ${theme === "dark" ? "white" : "black"}`,
              }}>
                <p className={`text-${theme === "dark" ? "light" : "dark"}`} onClick={()=>{toggleAccountName();props.UserUpdate()}}>My Account</p>
                <p className={`text-${theme === "dark" ? "light" : "dark"}`} onClick={LogOutHandler}>Log Out</p>
                <p className={`text-${theme === "dark" ? "light" : "dark"}`} style={{cursor:"default"}}>{user.authData.user.name}</p>
              </div>
            )}
      </div>
    </>
  );
};

export default Header;
