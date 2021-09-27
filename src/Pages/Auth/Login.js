import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";

import { loginUserAction } from "../../redux/user/actions";
import { logo } from "../../utils/ImagePath";
import AuthService from "../../Components/Service/AuthService";
import { useToast } from "../../hooks/useToast";

const errorMessage = {
  userName: "Username is required",
  password: "Password is required",
};
const Login = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [submit, setSubmit] = useState(false);

  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    userName: "",
    password: "",
  });

  const authService = new AuthService();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length > 0)
      setErrors((prevState) => ({ ...prevState, [name]: "" }));
    else
      setErrors((prevState) => ({ ...prevState, [name]: errorMessage[name] }));

    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };
  const validation = () => {
    const { userName, password } = credentials;

    let checkErrors = {};
    if (!userName) checkErrors.userName = errorMessage.userName;
    if (!password) checkErrors.password = errorMessage.password;

    setErrors(checkErrors);
    return checkErrors &&
      Object.keys(checkErrors).length === 0 &&
      checkErrors.constructor === Object
      ? true
      : false;
  };
  const handleLogin = () => {
    setSubmit(true);
    if (validation()) {
      let body = {
        userName: credentials.userName,
        password: credentials.password,
      };
      authService.loginData(body).then((response) => {
        dispatch(loginUserAction(response.data));
      });
    }
  };
  const validateInput = (name) => {
    if (submit) {
      return credentials[name].length > 0 ? null : (
        <small className="p-error p-invalid p-mx-6">{errors[name]}*</small>
      );
    }
  };
  return (
    <>
      <div className="p-grid">
        <div className="p-col-12 p-md-6 p-xl-3 p-mx-auto ">
          <div style={{ width: "280px" }} className="p-mx-auto p-my-3">
            <img
              style={{ width: "100%", height: "100%" }}
              src={logo}
              alt="Dolphins India"
            />
          </div>
          <div
            className="p-card"
            style={{ borderRadius: "10px", boxShadow: " 0px 4px 8px #666" }}
          >
            <div
              className="p-card-header p-p-3"
              style={{
                backgroundColor: "#eee",
                fontWeight: "600",
                fontSize: "18px",
                textAlign: "center",
              }}
            >
              WELCOME TO ADMIN PORTAL
            </div>
            <div className="p-card-body">
              <div
                className="p-text-center p-text-uppercase"
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                <i className="fa fa-users p-mx-2" aria-hidden="true"></i>
                Employee Login
              </div>
              <div className="p-inputgroup p-pt-4">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user" aria-hidden="true"></i>
                </span>
                <InputText
                  value={credentials.userName}
                  type="text"
                  autoCapitalize="off"
                  autoComplete="off"
                  onChange={(e) => handleChange(e)}
                  id="userName"
                  name="userName"
                  placeholder="employee@dolphins.com"
                />
              </div>
              {validateInput("userName")}
              <div className="p-inputgroup p-pt-4">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-key" aria-hidden="true"></i>
                </span>
                <Password
                  value={credentials.password}
                  onChange={(e) => handleChange(e)}
                  id="password"
                  name="password"
                  placeholder="Your Password"
                  feedback={false}
                  toggleMask
                />
              </div>
              {validateInput("password")}
              <div className="p-text-right">
                <Link
                  className="custom-router-link p-mx-1"
                  to="/auth/forgetPassword"
                >
                  <Button
                    style={{ color: "#20b5fa" }}
                    className="p-button-text p-button-info p-p-0"
                    label="Forget Password?"
                  />
                </Link>
              </div>
              <div className="p-pt-4 p-text-center">
                <Button
                  style={{ color: "#20b5fa" }}
                  onClick={handleLogin}
                  label="Sign-In"
                  className="p-button-info p-py-1 p-px-6 p-button-rounded p-button-outlined"
                />
              </div>
              <div className="p-mt-4 p-d-none">
                Don’t have an Account yet?
                <Link className="custom-router-link p-mx-1" to="/auth/register">
                  <Button
                    className="p-button-text p-button-help p-p-0"
                    label="Register"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
