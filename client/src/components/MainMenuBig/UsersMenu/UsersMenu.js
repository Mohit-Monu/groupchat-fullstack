import React, { useState, useEffect } from "react";
import classes from "./UsersMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import ShowUsers from "../../ShowUsers/ShowUsers";
import Button from "react-bootstrap/Button";
import { createGroup } from "../../../actions/UserActions";
import Spinner from "../../Spinner/Spinner";

const UsersMenu = (props) => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState(""); // State to store user input
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.authData.token);
  const groups = useSelector((state) => state.groupReducer.groupData);

  useEffect(() => {
    // Handle initial filtering (when component mounts)
    filterGroups(searchText);
  }, [searchText]);

  async function createGrouphandler() {
    setLoading(true);
    let groupname = prompt("Enter group name");
    try {
      if (groupname) {
        await dispatch(createGroup(groupname, token));
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  const handleInputChange = (e) => {
    const text = e.target.value;
    setSearchText(text); 
  };
  const filterGroups = (text) => {
    return groups.filter((group) =>
      group.group_name.toLowerCase().includes(text.toLowerCase())
    );
  };
  return loading ? (
    <Spinner />
  ) : (
    <>
      <div className={classes.inputContainer}>
        <input
          className={`${classes.inputt}`}
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleInputChange}
        />
        <Button onClick={createGrouphandler} className={classes.addButton}>
          Add
        </Button>
      </div>
      <div className={`${classes["big-box"]} p-1`}>
        {filterGroups(searchText).map((group) => (
          <ShowUsers
            key={group._id}
            groups={group}
            token={token}
            isSmallScreen={props.isSmallScreen}
            showmessage={props.showmessage}
          />
        ))}
      </div>
    </>
  );
};

export default UsersMenu;
