import { CLEAR_TOAST, DISPLAY_TOAST } from "./types";

const initialState = {
  payload: null,
};

export const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_TOAST:
      return {
        ...state,
        payload: action.payload,
      };
    case CLEAR_TOAST:
      return {
        ...state,
        payload: null,
      };
    default:
      return state;
  }
};
