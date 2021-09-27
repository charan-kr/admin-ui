import axios from "axios";
import { HelperService } from "./HelperService";

export default class SearchDBService extends HelperService {
  baseUri = process.env.REACT_APP_SEARCH_DB_URL;
  config = {
    headers: {},
  };

  // method      : POST
  // path        : /app/searchdb
  // description : Create new searchdb
  // access      : Protected

  insertSearchDB(body) {
    return axios.post(`${this.baseUri}/searchdb/`, body, this.config);
  }

  // method      : PUT
  // path        : /app/searchdb
  // description : update the searchdb
  // access      : Protected

  updateSearchDB(body) {
    return axios.put(`${this.baseUri}/searchdb/${body.id}`, body, this.config);
  }

  // method      : DELETE
  // path        : /app/searchdb/{id}
  // description : delete Coupon by passing its Id
  // access      : Protected

  deleteSearchDB(id) {
    return axios.delete(`${this.baseUri}/searchdb/${id}`, this.config);
  }
  // method      : GET
  // path        : /app/searchdb/{id}
  // description : get particular searchdb details by passing it's Id
  // access      : Protected

  getCouponById(id) {
    return axios.get(`${this.baseUri}/searchdb/${id}`, this.config);
  }
  // method      : GET
  // path        : /app/coupons
  // description : get All Coupons
  // access      : Protected

  getAllSearchDBs() {
    return axios.get(`${this.baseUri}/searchdb/`, this.config);
  }
  getAllSearchDBsByKeyword(keyword) {
    return axios.get(`${this.baseUri}/searchdb/home/${keyword}`, this.config);
  }

  // method      : GET
  // path        : /app/searchdb/status/{id}
  // description : update searchdb Status to ACTIVE
  // access      : Protected

  activateCouponStatus(id) {
    return axios.put(
      `${this.baseUri}/searchdb/status/${id}`,
      "active",
      this.config
    );
  }

  // method      : GET
  // path        : /app/searchdb/status/{id}
  // description : update searchdb Status to INACTIVE
  // access      : Protected

  deActivateCouponStatus(id) {
    return axios.put(
      `${this.baseUri}/searchdb/status/${id}`,
      "inactive",
      this.config
    );
  }
}
