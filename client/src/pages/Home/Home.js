import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import MainMenuBig from "../../components/MainMenuBig/MainMenuBig";
import MainMenuSmall from "../../components/MainMenuSmall/MainMenuSmall";

const Home = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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
  return (
    <>
      <Header />
      {isSmallScreen ?(<MainMenuSmall/>):(<MainMenuBig/>)}
    </>
  );
};

export default Home;
