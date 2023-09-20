import { combineReducers } from "redux";
import authReducer from "./AuthReducers";
import userSettingReducer from "./UserSettingsReducers";
import groupReducer from "./GroupReducers";

export const reducers = combineReducers({authReducer,userSettingReducer,groupReducer})