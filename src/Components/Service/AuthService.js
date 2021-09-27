import axios from "axios";

export default class OTPService {
  baseURI = `${process.env.REACT_APP_AUTHENTICATION_URL}/authentication-service`;
  getconfig() {
    return {
      headers: {
        "Content-Type": "application/json",
        "audience": "http://dolphinsindia.com"
      },
    };
  }
  getUserName(username) {
    return {
      headers: {          
        "audience": "http://dolphinsindia.com",
        "userName":`${username}`
      }
      } 
  }
    loginData(data) {
        const config = this.getconfig()        
        return axios.post(`${this.baseURI}/login`, data, config);        
  }
    resetPassword(username,data) {
      const config =  this.getUserName(username)  
        return axios.post(`${this.baseURI}/api/v1/resetPassword`, data, config);        
  }
  
}
