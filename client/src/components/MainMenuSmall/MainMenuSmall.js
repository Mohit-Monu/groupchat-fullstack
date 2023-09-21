import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import classes from "../MainMenuBig/MainMenuBig.module.css";
import UsersMenu from "../MainMenuBig/UsersMenu/UsersMenu";
import ChatMenu from "../MainMenuBig/ChatMenu/ChatMenu";

const MainMenuSmall = () => {
  const[showmessage,setshowmessage]=useState(false)
  function setMessageHandler(){
    setshowmessage(!showmessage)
  }
  return (
    <Container fluid className={`${classes["bigbox"]}`}>
      {!showmessage&&<UsersMenu isSmallScreen={true} showmessage={setMessageHandler}/>}
      {showmessage&&<ChatMenu isSmallScreen={true} showmessage={setMessageHandler}/>}
    </Container>
  );
};

export default MainMenuSmall;
