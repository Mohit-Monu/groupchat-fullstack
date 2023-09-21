import * as GroupApi from "../api/GroupApi";

export const getmessage = (_id,token) => async (dispatch) => {
    dispatch({ type: "GETTING_CURRENT_GROUP" });
  try {
    const  {data}  = await GroupApi.getmessage(_id,token);
    dispatch({ type: "GOT_CURRENT_GROUP",data:data });
  } catch (error) {
    console.log(error)
    throw new Error(error.response.data.message);
  }
};
export const getallgroup = (token) => async (dispatch) => {
  try{
    const  {data}  = await GroupApi.getallgroup(token);
    await dispatch({ type: "GET_ALL_GROUP", data:data.groups});
  }catch(error){
    console.log(error)
    // throw new Error(error.response.data.message);
  }
}
export const getallparticipent = (token,group_id) => async (dispatch) => {
  try{
    const  {data} = await GroupApi.getallparticipent(token,group_id);
    return data
  }catch(error){
    console.log(error)
    throw new Error(error.response.data.message);
  }
}
export const sendMessage = (config,token) => async (dispatch) => {
  try{
    const  {data}  = await GroupApi.sendMessage(config,token);
    await dispatch({ type: "SEND_MESSAGE", data:data.data,sender:data.sender});
    return [data.data,data.sender]
  }catch(error){
    console.log(error)
    throw new Error(error.response.data.message);
  }
}
export const SendFile = (config,token,group_id) => async (dispatch) => {
  try{
    const  {data}  = await GroupApi.SendFile(config,token,group_id);
    await dispatch({ type: "SEND_MESSAGE", data:data.data,sender:data.sender});
  }catch(error){
    console.log(error)
    throw new Error(error.response.data.message);
  }
}
export const receivemessage = (req) => async (dispatch) => {
  try{
    console.log(req)
    await dispatch({ type: "RECEIVED_MESSAGE", data:req});
  }catch(error){
    console.log(error)
    throw new Error(error.response.data.message);
  }
}

export const deleteGroup = (group_id,token) => async (dispatch) => {
  try{
    await GroupApi.deleteGroup(group_id,token);
    await dispatch({ type: "DELETE_GROUP", data:group_id});
  }catch(error){
    console.log(error)
    throw new Error(error.response.data.message);
  }
}
export const leaveGroup = (group_id,token,userId) => async (dispatch) => {
  try{
    await GroupApi.leaveGroup(group_id,token,userId);
    await dispatch({ type: "DELETE_GROUP", data:group_id});
  }catch(error){
    console.log(error)
    throw new Error(error.response.data.message);
  }
}
export const addUser = (config,token) => async (dispatch) => {
  try{
    const  data  = await GroupApi.addUser(config,token);
    return data
  }catch(error){
    console.log(error)
    throw new Error(error.response.data.message);
  }
}
export const removeuserGroup = (group_id,token,userId) => async (dispatch) => {
  try{
    const  data  = await GroupApi.removeuserGroup(group_id,token,userId);
    return data
  }catch(error){
    console.log(error)
    throw new Error(error.response.data.message);
  }
}
export const promoteuserGroup = (group_id,token,userId) => async (dispatch) => {
  try{
    const  data  = await GroupApi.promoteuserGroup(group_id,token,userId);
    return data
  }catch(error){
    console.log(error)
    throw new Error(error.response.data.message);
  }
}
 
export const UpdateGroupPic = (picdata,token,groupid) => async (dispatch) => {
  try{
    const  data  = await GroupApi.UpdateGroupPic(picdata,token,groupid);
    await dispatch({ type: "UPDATE_GROUP_PIC", data:data.data.fileURl,groupid});
  }catch(error){
    console.log(error)
    throw new Error(error.response.data.message);
  }
}
export const UpdateGroup = (formdata,token,groupid) => async (dispatch) => {
  try{
    const  data  = await GroupApi.UpdateGroup(formdata,token,groupid);
    await dispatch({ type: "UPDATE_GROUP", data:formdata,groupid});
    console.log(data)
  }catch(error){
    console.log(error)
    throw new Error(error.response.data.message);
  }
}

 