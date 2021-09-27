import axios from "axios";

export default class OTPService {
  baseURI = process.env.REACT_APP_OTP_URL;
  getconfig() {
    return {
      headers: {
        "Content-Type": "application/json",        
      },
    };
  }
  sendOTP(email) {
    const config = this.getconfig()
    return axios.post(`${this.baseURI}/otpDetails`,email,config);
  }
  verifyOTP(data) {
    const config = this.getconfig()
    return axios.post(`${this.baseURI}/verifyOtp`,data,config);
  }
  
}
