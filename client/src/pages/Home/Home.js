import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import MainMenuBig from "../../components/MainMenuBig/MainMenuBig";
import MainMenuSmall from "../../components/MainMenuSmall/MainMenuSmall";
import UserUpdate from "../../components/UserUpdate/UserUpdate";

const Home = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [updateuser,setupdateuser]=useState(false)
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 576);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  function userUpdateHandler(){
    setupdateuser(!updateuser)
  }
  return (
    <>
      <Header isSmallScreen={isSmallScreen} UserUpdate={userUpdateHandler}/>
      {updateuser?<UserUpdate UserUpdate={userUpdateHandler}/>:isSmallScreen ?(<MainMenuSmall/>):(<MainMenuBig/>)}
    </>
  );
};

export default Home;
