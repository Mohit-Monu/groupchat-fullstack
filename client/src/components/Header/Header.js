import React from "react";
import classes from "./Header.module.css";
import photo from "./photo.png";
import { Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { ChangeTheme } from "../../actions/UserActions";
import userpic from "./usericon.png";
const Header = () => {
  const theme = useSelector((state) => state.userSettingReducer.theme);
  const user = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();
  function themeHandler() {
    dispatch(ChangeTheme());
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
          {user.authData && <img
            className={classes.userpic}
            src={
              user && user.authData && user.authData.user.profilePic
                ? user.authData.user.profilePic
                :  userpic
            }
          />}
          <Form>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              onClick={themeHandler}
            />
          </Form>
          <Image fluid src={photo} />
        </div>
      </div>
    </>
  );
};

export default Header;
