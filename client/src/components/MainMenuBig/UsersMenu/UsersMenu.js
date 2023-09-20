import React, { useState } from "react";
import classes from "./UsersMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import ShowUsers from "../../ShowUsers/ShowUsers";
import Button from "react-bootstrap/Button";
import { createGroup } from "../../../actions/UserActions";
import Spinner from "../../Spinner/Spinner";
const UsersMenu = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.userSettingReducer.theme);

  const token = useSelector((state) => state.authReducer.authData.token);
  const groups = useSelector((state) => state.groupReducer.groupData);

  async function createGrouphandler() {
    setLoading(true);
    let groupname = prompt("enter group name");
    try {
      await dispatch(createGroup(groupname, token));
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  return loading ? (
    <Spinner />
  ) : (
    <>
      <input
        className={`${classes.inputt}`}
        type="text"
        placeholder="search or start a new chat"
      />
      <Button onClick={createGrouphandler} style={{ marginLeft: "5px" }}>
        Add
      </Button>
      <div
        className={`${classes["big-box"]} p-1`}
      >
        {groups.map((groups)=>(
          <ShowUsers key={groups._id} groups={groups} token={token} />
        ))}
      </div>
    </>
  );
};

export default UsersMenu;
