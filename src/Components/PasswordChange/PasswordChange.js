import React, { useState } from "react";
import { Redirect } from "react-router";
import { Button } from "primereact/button";
import AuthService from "../../Components/Service/AuthService";
import { logo } from "../../utils/ImagePath";
import { Password } from "primereact/password";
import { useToast } from "../../hooks/useToast";
import { useQuery } from "../../utils/useQuery";

function PasswordChange() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [valideteOtp, setvalidateOtp] = useState(false);
  const [userId] = useState(useQuery().get("userId"));

  const toast = useToast()

  const authService = new AuthService()

  const handlePasswordChange = () => {
    if (!password || !password2) {
      toast({
        severity: "warn",
        summary: "Enter all Fields",
      });
    } else if (password.length < 6) {
      toast({
        severity: "warn",
        summary: "password cannot be lesser than 6 character",
      });
    } else if (password !== password2) {
      toast({
        severity: "error",
        summary: "password mismatch",
      });
    } else {
      const body = {
        newPassword: password,
        reEnterNewPassword:password2
      }     
      authService.resetPassword(userId, body).then((res) => {        
        if (res.status === 200) {
          toast({
            severity: "success",
            summary: res.data,
            detail: <span>Redirecting to our home page</span>,
          });         
          setTimeout(() => {
            setvalidateOtp(true);
          }, 2000);
        }       
      })
        .catch((err) => {         
          toast({
            severity: "error",
            summary: err?.response?.data?.message            
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
            className="p-card-header p-p-3"
            style={{
              backgroundColor: "#eee",
              fontWeight: "600",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            RESET PASSWORD
          </div>
            <div className="p-card-body">              
              <div
                className=" p-text-uppercase">
                <span className="p-m-0 p-pb-1" style={{ fontWeight: "600",color:'#20b5fa' }}>
                Create new password
                </span>
            </div>
              <small>We'll ask for this password whenever you sign in.</small>
              <div className="p-fluid p-mt-3">
              <div className='p-mb-2'>
                <label className="p-my-2 p-mb-1">New Password</label>
                </div>
                <Password
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  name="password"
                  type="password"
                  placeholder='Enter Password'
                  toggleMask
                />
                <small>                  
                  Passwords must be at least 6 characters.
                </small>
                <div className='p-mb-2'>
                <label className="p-my-2 p-mb-1">Confirm password</label>
                </div>
                <Password
                  onChange={(e) => setPassword2(e.target.value)}
                  type="password"
                  name="password2"
                  value={password2}
                  toggleMask
                  placeholder='Re enter password'
                />
              </div>
              <div className="p-pt-3 p-pb-2 p-text-center">
                <Button style={{ color:'#20b5fa' }}
                  onClick={() => handlePasswordChange()}
                  className="p-py-1 p-px-6 p-button-rounded p-button-outlined"
                  label="Save changes and sign in"
                  />
                  </div>
            </div>
          </div>
        </div>
      </div>
      {valideteOtp && <Redirect to="/" />}
    </React.Fragment>
  );
}

export default PasswordChange;
