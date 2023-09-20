import React from "react";
import Container from "react-bootstrap/Container";
import classes from "../MainMenuBig/MainMenuBig.module.css";
import UsersMenu from "../MainMenuBig/UsersMenu/UsersMenu";
const MainMenuSmall = () => {
  return (
    <Container fluid className={`${classes["bigbox"]}`}>
      <UsersMenu />
    </Container>
  );
};

export default MainMenuSmall;
