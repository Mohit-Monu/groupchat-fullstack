const authReducer = (
  state = { authData: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false };
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, error: false };
    case "AUTH_FAIL":
      return { ...state, loading: false, error: true };
    case "UPDATE_USER_PIC":
      const updatedpic={...state.authData}
      updatedpic.user.profilePic=action.data
      localStorage.setItem("profile", JSON.stringify({ ...updatedpic }));
      return { ...state, authData: updatedpic, loading: false, error: false };
      
    case "UPDATE_USER_DATA":
      const updated={...state.authData}
      updated.user={...updated.user,...action.data}
      localStorage.setItem("profile", JSON.stringify({ ...updated }));
      return { ...state, authData: updated, loading: false, error: false };
    case "LOG_OUT":
      localStorage.clear();
      return { ...state, authData: null, loading: false, error: false };
    default:
      return state;
  }
};
export default authReducer;
