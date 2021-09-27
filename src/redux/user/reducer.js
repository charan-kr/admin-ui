import { USER_LOGIN, USER_LOGOUT } from "./types";

const initialState = {
  loggedIn: false,
  token: "",
  email: "",
  roles: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        loggedIn: true,
        ...action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        loggedIn: false,
        roles: [],
      };
    default:
      return state;
  }
};
