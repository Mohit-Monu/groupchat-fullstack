import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from "./MainMenuBig.module.css";
import { useSelector } from "react-redux";

import UsersMenu from "./UsersMenu/UsersMenu";
import ChatMenu from "./ChatMenu/ChatMenu"
const MainMenuBig = () => {
  const theme = useSelector((state) => state.userSettingReducer.theme);
  
  return (
    <Container fluid className={`${classes["bigbox"]}`}>
      <Row >
        <Col className={`${classes["userbox"]} p-1 `} style={{borderRight:`${theme==="dark"?("2px solid white"):("2px solid black ")}`}}>
          <UsersMenu />
        </Col>
        <Col className={`${classes["userbox"]}  p-1`} sm={8}>
          <ChatMenu/>
        </Col>
      </Row>
    </Container>
  );
};

export default MainMenuBig;
