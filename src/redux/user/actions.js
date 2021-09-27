import jwt_decode from "jwt-decode";
import { USER_LOGIN, USER_LOGOUT } from "./types";

export const loginUserAction = (data) => (dispatch) => {
  let decoded = jwt_decode(data);
  if (decoded?.sub.length > 0) {
    const payload = {
      token: data,
      email: decoded?.sub,
      roles: decoded?.scopes,
    };

    dispatch({
      type: USER_LOGIN,
      payload,
    });
  }
};
export const logoutUserAction = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
};
