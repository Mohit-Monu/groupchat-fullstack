import React from 'react'
import classes from "../MainMenuBig/UsersMenu/UsersMenu.module.css";
import { useDispatch, useSelector } from 'react-redux';
import groupicon from "./defaultgroup.jpg"
import { getmessage } from '../../actions/GroupActions';
const ShowUsers = (props) => {
  const theme = useSelector((state) => state.userSettingReducer.theme);
  const token=useSelector(state=>state.authReducer.authData.token)
  const dispatch=useDispatch()
  return (
      <div onClick={()=>{
        dispatch(getmessage(props.groups._id,props.token))
        if(props.isSmallScreen){
          props.showmessage()
        }
        }
      } className={`${classes.box} bg-${theme}`} style={{
        border: `2px solid ${theme === "dark" ? "#f8f9fa" : "#343a40"}`,
      }}>
      <img src={props.groups.group_Img?(props.groups.group_Img):(groupicon)} />
      <h5 className={`text-${theme === "dark" ? "light" : "dark"}`}>
      {props.groups.group_name}
      </h5>
    </div>
  )
}

export default ShowUsers