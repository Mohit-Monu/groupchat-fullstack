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
