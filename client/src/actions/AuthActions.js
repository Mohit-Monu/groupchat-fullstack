import * as AuthApi from "../api/AuthApi";
export const signIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    
    const { data } = await AuthApi.signIn(formData);
    await dispatch({ type: "AUTH_SUCCESS", data:data });
    navigate("../", { replace: true });
  } catch (error) {
    dispatch({ type: "AUTH_FAIL" });
    throw new Error(error.response.data.message);
  }
};
export const signUp = (dataform) => async (dispatch) => {
  try {
    const { data } = await AuthApi.signUp(dataform);
    return data
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
