import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { logo } from "../../utils/ImagePath";
import { useQuery } from "../../utils/useQuery";
import OTPService from "../Service/OTPService";
import { useToast } from "../../hooks/useToast";

function PasswordAuthentication() {
  const [userId] = useState(useQuery().get("userId"));
  const [next] = useState(useQuery().get("next") || "");
  const [redirect, setRedirect] = useState(false);
  const [cont, setCont] = useState(false);
  const [otp, setOtp] = useState("");
  const toast = useToast();
  const valiateOTP = () => {
    setCont(true);
    if (!otp) {
      toast({
        severity: "warn",
        summary: "Warning",
        detail: "Please enter your OTP"
      });
    } else {
      const otpService = new OTPService();
      const body = {
        email: userId,
        otp
      }
      otpService.verifyOTP(body).then((res) => {
        console.log(res)
        if (res.data) {
          toast({
            severity: "success",
            summary: "OTP Verification Success"
          });
          setRedirect(true);
        }
        else {
          toast({
            severity: "error",
            summary: "Verification Failed",
            detail: "Please check your OTP"
          });
        }
      })
        .catch((err) => {
          console.log(err)
          toast({
            severity: "error",
            summary: "Verification Failed",
            detail: err?.response?.data?.message
          });
        })
    }
  };

  return (
    <React.Fragment>
      <div className="p-grid">
        <div className="p-col-12 p-md-5 p-xl-3 p-mx-auto">
          <div style={{ width: "280px" }} className="p-mx-auto p-my-3">
            <img
              src={logo}
              alt="logo"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div
            className="p-card"
            style={{ borderRadius: "10px", boxShadow: " 0px 4px 8px #666" }}
          >
            <div
              className="p-card-header p-text-uppercase p-p-3"
              style={{
                backgroundColor: "#eee",
                fontWeight: "600",
                fontSize: "18px",
                textAlign: "center",
              }}
            >
              OTP Authentication
            </div>
            <div className="p-card-body ">
              <div className='p-text-uppercase'>
                <span className="p-m-0" style={{ fontWeight: "600", color: '#20b5fa' }}>
                  OTP required
                </span>
              </div>
              <small>
                For your security, we need to authenticate your request. We've
                sent an OTP to the <b>{userId}</b> Please enter it below to
                complete verification
              </small>
              <div className="p-fluid p-mt-3">
                <div className='p-mb-2'>
                  <label className="p-my-2 p-mb-1">Enter your OTP*</label>
                </div>
                <InputText
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  name="otp"
                  keyfilter="num"
                />
                {cont && !otp && (
                  <div className="p-invalid">
                    <small className='p-error'>
                      OTP cannot be empty
                    </small>
                  </div>
                )}
              </div>
              <div className="p-pt-3 p-pb-2 p-text-center">
                <Button style={{ color: '#20b5fa' }}
                  onClick={() => valiateOTP()}
                  className="p-py-1 p-px-6 p-button-rounded p-button-outlined"
                  label="Continue"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {redirect && <Redirect to={`/auth/${next}?userId=${userId}`} />}
    </React.Fragment>
  );
}

export default PasswordAuthentication;
