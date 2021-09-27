import axios from "axios";

export default class FAQService {
  baseUri = process.env.REACT_APP_BASE_URL;
  getconfig() {
    return {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
  getAllFAQ() {
    return axios.get(`${this.baseUri}/dolphinshelps`);
  }
  createNewFAQ(body) {
    return axios.post(`${this.baseUri}/dolphinshelp`, body);
  }
  getFAQ(id) {
    return axios.get(`${this.baseUri}/dolphinshelp/${id}`);
  }

  updateFAQ(body) {
    return axios.put(`${this.baseUri}/dolphinshelp`, body, this.config);
  }
  deleteFAQ(id) {
    return axios.delete(`${this.baseUri}/dolphinshelp/${id}`);
  }
}
