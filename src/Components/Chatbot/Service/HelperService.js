import { store } from "../../../redux/Store";
import { toastMessage } from "../../../redux/toast/action";
// import writeLog from "lib/logWriter";

// import { logEventAction } from "redux/logger/loggerActions";

export class HelperService {
  constructor() {
    this.errors = {
      HTTP_500: "INTERNAL_SERVER_ERROR",
      HTTP_400: "BAD_REQUEST",
      HTTP_401: "UNAUTHORIZED",
      HTTP_403: "FORBIDEN_ACCESS",
      HTTP_505: "INTERNAL_SERVER_ERROR",
      DEFAULT: "SOMETHING_WENT_WRONG",
    };
  }
  debugStatus = false;
  getConfig(params = null, headers = null) {
    const config = {};
    config.headers = {
      "Content-Type": "application/json",
      audience: "http://dolphinsindia.com",
      Authorization: `Bearer ${this.getToken()}`,
    };
    if (headers) config.headers = { ...config.headers, ...headers };
    if (params) config.params = params;

    return config;
  }
  getCustomerId() {
    return store.getState()?.user?.customerId;
  }
  getToken() {
    return store.getState()?.user?.token;
  }
  getEmailId() {
    return store.getState().user?.email;
  }

  getAudience() {
    return `http://www.dolphinskart.com/`;
  }

  handleResponse(response) {
    // this.log(response);
  }
  handleErrors(error, toast = true) {
    let message = "";
    switch (error.response?.status) {
      case 400:
        message = this.errors.HTTP_400;
        break;
      case 401:
        message = this.errors.HTTP_401;
        break;
      case 403:
        message = this.errors.HTTP_403;
        break;
      case 500:
        message = this.errors.HTTP_500;
        break;
      case 505:
        message = this.errors.HTTP_505;
        break;
      default:
        message = this.errors.DEFAULT;
        break;
    }

    let errorStatus = error.response?.status;
    let errorCode = error.response?.data?.errorCode;
    let errorMessage = error.response?.data?.message || error.message;

    const errorPayload = {
      timestamp: new Date(),
      errorStatus,
      errorCode,
      errorMessage,
      message,
      original: error.response,
    };
    // writeLog(errorPayload);
    // if (process.env.NODE_ENV !== "production" && this.debugStatus)
    //   console.log(errorPayload);
    if (toast) {
      store.dispatch(
        toastMessage({
          severity: "error",
          summary: JSON.stringify(errorMessage).slice(1, -1),
        })
      );
    }
    return errorMessage;
  }
  logAnalytics(analytics) {
    this.handleResponse(analytics);
    // store.dispatch(logEventAction(analytics));
  }
}

export default HelperService;
