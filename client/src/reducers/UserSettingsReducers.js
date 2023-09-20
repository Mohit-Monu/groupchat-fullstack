const userSettingReducer = (
    state = { theme:"light" },
    action
  ) => {
    switch (action.type) {
      case "THEME_CHANGE":
        return { ...state,theme: state.theme === "dark" ? "light" : "dark" };
      default:
        return state;
    }
  };
  export default userSettingReducer;
  