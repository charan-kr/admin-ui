import { CLEAR_TOAST, DISPLAY_TOAST } from "./types";

export const toastMessage = (payload) => (dispatch) => {
  dispatch({
    type: DISPLAY_TOAST,
    payload,
  });
  setTimeout(() => {
    dispatch(clearMessage());
  }, 250);
};

export const clearMessage = () => (dispatch) => {
  dispatch({
    type: CLEAR_TOAST,
  });
};
