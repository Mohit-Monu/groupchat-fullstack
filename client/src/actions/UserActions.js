import * as UserApi from "../api/UserApi";

export const ChangeTheme = () => async (dispatch) => {
  dispatch({ type: "THEME_CHANGE" });
};
export const createGroup = (req,token) => async (dispatch) => {
  try {
    const { data } = await UserApi.createGroup(req,token);
    dispatch({ type: "CREATE_GROUP_SUCCESS",data:data.group }); 
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
export const UpdateUserPic = (picdata,token) => async (dispatch) => {
  try{
    const  data  = await UserApi.UpdateUserPic(picdata,token);
    await dispatch({ type: "UPDATE_USER_PIC", data:data.data.fileURl});
  }catch(error){
    console.log(error)
    throw new Error(error.response.data.message);
  }
}
export const updateProfile = (picdata,token) => async (dispatch) => {
  try{
    const  data  = await UserApi.updateProfile(picdata,token);
    await dispatch({ type: "UPDATE_USER_DATA", data:data.data.myobj});
  }catch(error){
    console.log(error)
    throw new Error(error.response.data.message);
  }
}