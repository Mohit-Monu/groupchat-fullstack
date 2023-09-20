import React, { useEffect, useRef, useState } from "react";
import classes from "./ChatMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import Picker from "emoji-picker-react";
import emojiLogo from "./emojilogo.png";
import emojiLogolight from "./emojilogolight.png";
import attachLogo from "./attach.png";
import attachLogolight from "./attachlight.png";
import Button from "react-bootstrap/Button";
import ShowMessages from "../../ShowMessages/ShowMessages";
import Spinner from "../../Spinner/Spinner"
import groupicon from "./defaultgroup.jpg"
import { sendMessage } from "../../../actions/GroupActions";
import { ShowParticipent } from "../../ShowParticipent/ShowParticipent";
const ChatMenu = () => {
  const theme = useSelector((state) => state.userSettingReducer.theme);
  const token = useSelector((state) => state.authReducer.authData.token);
  const group = useSelector((state) => state.groupReducer);
  const emojiPickerRef = useRef(null);
  const [inputState, setInputState] = useState("");
  const [showparticepent,setshowparticipent] = useState(false);
  const [EmojiHandler, setEmojiHandler] = useState(false);
  const scrollableDivRef = useRef(null);
  const dispatch=useDispatch()
  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
    }
    setshowparticipent(false)
  }, [group]);
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setEmojiHandler(false);
      }
    };
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  const onEmojiClick = (event, emojiObject) => {
    setInputState((prev) => prev + event.emoji);
  };
  function sendMessageHandler(e) {
    e.preventDefault();
    const config={
      message:inputState,
      group_id:group.currentgroupdata.group._id,
    }
    dispatch(sendMessage(config,token))
    setInputState("")
  }
  function sendFileHandler(e) {
    console.log(e.target.files[0]);
  }
  function showparticipenthandler(){
    setshowparticipent(true)
  }
  return group.loading?(<Spinner/>):(!group.currentgroupdata.group ? (
    <div className={`${classes['group-selector']}` } >
      <h2 className={`${classes.heading} text-${theme==="dark"?"light":"dark"}`}>Select the Group to Show Messages</h2>
    </div>
  ) : (
    showparticepent?(<ShowParticipent/>):(<div>
      <div
        className={`${classes.box} bg-${theme}`}
        onClick={showparticipenthandler}
        style={{
          border: `2px solid ${theme === "dark" ? "#f8f9fa" : "#343a40"}`,
        }}
      >
        <img src={group.currentgroupdata.group.group_Img?(group.currentgroupdata.group.group_Img):(groupicon)} />
        <h5 className={`text-${theme === "dark" ? "light" : "dark"}`}>
          {group.currentgroupdata.group.group_name}
        </h5>
      </div>
      <div className={`${classes["big-box"]} `} ref={scrollableDivRef}>
        <ShowMessages />
      </div>
      {EmojiHandler && (
        <div className={`${classes.picker}`} ref={emojiPickerRef}>
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      )}
      <form onSubmit={sendMessageHandler}>
        <div
          className={`${classes.inputt} `}
          
        >
          <img
            className={`${classes.img1} `}
            src={theme==="dark"?(emojiLogolight):(emojiLogo)}
            ref={emojiPickerRef}
            onClick={() => setEmojiHandler(true)}
          />
          <label htmlFor="filesend">
            <img className={`${classes.img2}`} src={theme==="dark"?(attachLogolight):(attachLogo)} />
          </label>
          <input
            id="filesend"
            onChange={sendFileHandler}
            type="file"
            style={{ display: "none" }}
          />
          <input
            onChange={(e) => setInputState(() => e.target.value)}
            value={inputState}
            className={`${classes.input2}`}
            type="text"
            placeholder="Type a message"
            required
          />
          <Button type="submit" variant="success" className={`${classes.butt}`}>
            Send
          </Button>
        </div>
      </form>
    </div>)
  ))
};

export default ChatMenu;
