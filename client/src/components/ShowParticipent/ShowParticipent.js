import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getallparticipent,
  addUser,
  deleteGroup,
  leaveGroup,
  removeuserGroup,
  promoteuserGroup,
} from "../../actions/GroupActions";
import groupicon from "./defaultgroup.jpg";
import classes from "./ShowParticipent.module.css";
import usericon from "./usericon.png";
import { Button } from "react-bootstrap";
import GroupEdit from "./GroupEdit";
import Spinner from "../Spinner/Spinner";
import backbtn from "./backbtn.png"
import backbtnlight from "./backbtnlight.png"

export const ShowParticipent = (props) => {
  const group = useSelector(
    (state) => state.groupReducer.currentgroupdata.group
  );
  const token = useSelector((state) => state.authReducer.authData);
  const theme = useSelector((state) => state.userSettingReducer.theme);
  const [participent, setparticipent] = useState([]);
  const adduserref = useRef();
  const [isadmin, setisadmin] = useState(false);
  const [loading, setloading] = useState(false);
  const [edit, setedit] = useState(false);
  const [error, setError] = useState("");
  const [messageshow, setmessageshow] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    async function getdata() {
      try {
        const res = await dispatch(getallparticipent(token.token, group._id));
        setparticipent(res.members);
        res.members.forEach((member) => {
          if (member.user._id === token.user._id) {
            if (member.isAdmin) {
              setisadmin(true);
            }
          }
        });
      } catch (err) {}
    }
    getdata();
  }, []);
  async function addUserhandler(e) {
    setloading(true);
    setError("");
    setmessageshow("");
    e.preventDefault();
    const config = {
      useremail: adduserref.current.value,
      group_id: group._id,
    };
    try {
      const res = await dispatch(addUser(config, token.token));
      const res2 = await dispatch(getallparticipent(token.token, group._id));
      setparticipent(res2.members);
      setmessageshow(res.data.message);
      setloading(false);
    } catch (err) {
      setError(err.message);
      setloading(false);
    }
  }
  async function EditGroupHandler() {
    setedit(!edit);
  }
  async function DeleteGroupHandler() {
    setloading(true);
    await dispatch(deleteGroup(group._id, token.token));
    setloading(false);
  }
  async function leavegroupHandler(e) {
    setloading(true);
    const userId = e.target.value;
    await dispatch(leaveGroup(group._id, token.token, userId));
    setloading(false);
  }
  async function removeuserhandler(e) {
    setloading(true);
    setError("");
    setmessageshow("");
    const userId = e.target.value;
    const res = await dispatch(removeuserGroup(group._id, token.token, userId));
    const res2 = await dispatch(getallparticipent(token.token, group._id));
    setparticipent(res2.members);
    setmessageshow(res.data.message);
    setloading(false);
  }
  async function promoteuserhandler(e) {
    setloading(true);
    const userId = e.target.value;
    const res = await dispatch(
      promoteuserGroup(group._id, token.token, userId)
    );
    const res2 = await dispatch(getallparticipent(token.token, group._id));
    setparticipent(res2.members);
    setmessageshow(res.data.message);
    setloading(false);
  }
  return edit ? (
    <GroupEdit EditGroupHandler={EditGroupHandler} />
  ) : loading ? (
    <Spinner />
  ) : (
    <div className={`${classes["group-container-big"]}`}>
        <img className={`${classes["backbtn"]}`} src={theme==="dark"?backbtnlight:backbtn} onClick={()=>{props.showparticepent()}}/>
      <div className={`${classes["group-container"]}`}>
        <img
          className={`${classes["groupimage"]}`}
          style={{
            border: `3px solid ${theme === "dark" ? "green" : "black"}`,
          }}
          src={group.group_Img ? group.group_Img : groupicon}
          alt="Group Icon"
        />

        <h1
          className={`${classes["group-name"]} text-${
            theme === "dark" ? "light" : "dark"
          }`}
        >
          {group.group_name}
        </h1>
        <h1
          className={`${classes["group-description"]} text-${
            theme === "dark" ? "light" : "dark"
          }`}
        >
          {group.group_description ? group.group_description : "No Description"}
        </h1>
        <h1
          className={`${classes["group-createdAt"]} text-${
            theme === "dark" ? "light" : "dark"
          }`}
        >
          Created on- {group.createdAt}
        </h1>
        {isadmin && (
          <div>
            <Button
              onClick={EditGroupHandler}
              variant={theme}
              style={{
                border: `2px solid ${theme === "dark" ? "white" : "black"}`,
                marginRight: "5px",
              }}
            >
              Edit
            </Button>
            <Button
              onClick={DeleteGroupHandler}
              variant={theme}
              style={{
                border: `2px solid ${theme === "dark" ? "white" : "black"}`,
              }}
            >
              Delete
            </Button>
          </div>
        )}
        <br />
      </div>
      {isadmin && (
        <form onSubmit={addUserhandler} className={classes["input-box"]}>
          <input
            type="email"
            className={classes["input-field"]}
            placeholder="Email"
            autoComplete="off"
            required
            ref={adduserref}
          />
          <Button
            variant={theme}
            type="submit"
            style={{
              border: `2px solid ${theme === "dark" ? "white" : "black"}`,
            }}
          >
            Add user
          </Button>
          <p className="text-center">{error}</p>
          <p className="text-center text-success">{messageshow}</p>
        </form>
      )}
      <h3 className={`text-${theme === "dark" ? "light" : "dark"} text-center`}>
        Participents
      </h3>
      {participent.map((user) => (
        <div
          key={user.user._id}
          className={`${classes["participent"]} bg-${theme}`}
          style={{
            border: `2px solid ${theme === "dark" ? "white" : "black"}`,
          }}
        >
          <img src={user.user.profilePic ? user.user.profilePic : usericon} />

          {token.user._id === user.user._id ? (
            <>
              <h4 className={`text-${theme === "dark" ? "light" : "dark"}`}>
                You
              </h4>
              <Button 
                onClick={leavegroupHandler}
                value={user._id}
                variant={theme}
                style={{
                  border: `2px solid ${theme === "dark" ? "white" : "black"}`,
                }}
              >
                Leave
              </Button>
              {user.isAdmin && (
                <p className={`text-${theme === "dark" ? "light" : "dark"}`}>
                  Admin
                </p>
              )}
            </>
          ) : (
            <>
              <h4 className={`text-${theme === "dark" ? "light" : "dark"}`}>
                {user.user.name}
              </h4>
              {isadmin && (
                <>
                  <Button
                    variant={theme}
                    value={user._id}
                    onClick={removeuserhandler}
                    style={{
                      border: `2px solid ${
                        theme === "dark" ? "white" : "black"
                      }`,
                    }}
                  >
                    Remove
                  </Button>
                  {!user.isAdmin && (
                    <Button
                      value={user._id}
                      variant={theme}
                      onClick={promoteuserhandler}
                      style={{
                        border: `2px solid ${
                          theme === "dark" ? "white" : "black"
                        }`,
                      }}
                    >
                      Promote
                    </Button>
                  )}
                </>
              )}

              {user.isAdmin && (
                <p className={`text-${theme === "dark" ? "light" : "dark"}`}>
                  Admin
                </p>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};
export default ShowParticipent;
