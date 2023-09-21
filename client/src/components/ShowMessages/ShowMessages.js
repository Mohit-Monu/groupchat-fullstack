import React from "react";
import classes from "./ShowMessages.module.css";
import { useSelector } from "react-redux";
import attach from "./attach.png"
const ShowMessages = () => {
  const theme = useSelector((state) => state.userSettingReducer.theme);
  const userId = useSelector((state) => state.authReducer.authData.user._id);
  const messages = useSelector(
    (state) => state.groupReducer.currentgroupdata.messages
  );
  return (
    <div className={classes["bigbox"]}>
      {messages.map((message) => {
        const date = new Date(message.createdAt);
        date.setUTCHours(date.getUTCHours() + 5);
        date.setUTCMinutes(date.getUTCMinutes() + 30);
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;

        if (message.sender._id === userId) {
          return (
            <div
              key={message._id}
              className={classes.yourmsg}
              style={{
                backgroundColor: `${
                  theme === "dark" ? "rgb(190, 190, 190)" : "lightgreen"
                }`,
              }}
            >
              <b className={classes.name}>You</b>
              {message.type === "image" ? (
                <img src={message.message} className={classes.imag} onClick={()=>{window.location.href=message.message}}/>
              ) : message.type === "file" ? (
                <img src={attach} className={classes.imag} onClick={()=>{window.location.href=message.message}}/>
              ) : (
                <p className={classes.msg}>{message.message}</p>
              )}
              <small className={classes.time}>{formattedTime}</small>
            </div>
          );
        } else {
          return (
            <div
              key={message._id}
              className={classes.othermsg}
              style={{
                backgroundColor: `${
                  theme === "dark" ? "rgb(128, 128, 128)" : "rgb(102, 185, 102)"
                }`,
              }}
            >
              <b className={classes.name}>{message.sender.name}</b>
              {message.type === "image" ? (
                <img src={message.message} className={classes.imag} onClick={()=>{window.location.href=message.message}}/>
              ) : message.type === "file" ? (
                <img src={attach} className={classes.imag} onClick={()=>{window.location.href=message.message}}/>
              ) : (
                <p className={classes.msg}>{message.message}</p>
              )}
              <small className={classes.time}>{formattedTime}</small>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ShowMessages;
