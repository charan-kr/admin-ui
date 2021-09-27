import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";

import { validateEmail } from "../../utils/validateEmail";
import { useToast } from "../../hooks/useToast";
import { logo } from "../../utils/ImagePath";
import OTPService from "../Service/OTPService";

function PasswordAssistance() {
  const [userForgotId, setUserForgotId] = useState("");
  const toast = useToast();
  
  const handleForgotpassword = () => {
    let emailFlag = true;
    if (parseInt(userForgotId)) {
      if (parseInt(userForgotId).toString().length === userForgotId.length)
        emailFlag = false;
    }
    if (!emailFlag) {
      if (userForgotId.length !== 10) {
        toast({
          severity: "warn",
          summary: "Enter a valid Phone Number",
        });
        return;
      }
    }
    if(emailFlag) {
      if (!validateEmail(userForgotId)) {
        toast({
          severity: "error",
          summary: "Enter a valid Email-id",
        });
        return;
      }
    }

    const otpService = new OTPService();    
    const body = {
      email: userForgotId      
    }
    otpService.sendOTP(body).then((res) => {
      console.log(res)
      toast({
        severity: "success",
        summary: "A link has been sent to your email to change your passoword",
        detail: (
          <Link
            className="custom-router-link"
            to={`/auth/validateotp?next=resetPassword&userId=${userForgotId}`}
          >
            <i className="fa fa-link" aria-hidden="true"></i> Link
          </Link>
        ),
        life: 8000,
      });
    })
      .catch((err) => {
        console.log(err)
        toast({
          severity: "error",
          summary: err?.response?.data?.message           
        }); 
    })
      
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
            className="p-card-header  p-text-uppercase p-p-3"
            style={{
              backgroundColor: "#eee",
              fontWeight: "600",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
             Password assistance
          </div>
          <div className="p-card-body">           
                <small className="p-m-0">
                  Enter the email address or mobile  number associated with your
                  DolphinsIndia account.
                </small> 
            <div className="p-inputgroup p-pt-4">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user" aria-hidden="true"></i>
              </span>
              <InputText
                  autoComplete="off"                  
                  value={userForgotId}
                  name="userForgotId"
                  id="userForgotId"
                  placeholder='Enter your email or mobile no'
                  onChange={(e) => setUserForgotId(e.target.value)}
                  />
            </div>                                
            <div className="p-pt-3 p-pb-2 p-text-center">
              <Button style={{ color:'#20b5fa' }}
                onClick={() => handleForgotpassword()}
                label="Continue"
                className="p-py-1 p-px-6 p-button-rounded p-button-outlined"
              />
              </div>               
             
            </div>                 
          </div>
          <Divider/>
          <div className='p-mb-1'>                
                <span style={{ fontWeight: "500" }}>                  
                  Has your email address or mobile number changed?
                </span>                
              </div>                                                       
              <small >                        
                If you no longer use the e-mail address associated with your         
                DolphinsIndia account, you may contact         
                <Link style={{ color:'#20b5fa' }} to="/" className="p-mx-1 custom-router-link">            
                  Customer Service                  
                </Link>                          
                for help restoring access to your account.
              </small>     
        </div>
      </div>
  </>



 
  );
}

export default PasswordAssistance;
