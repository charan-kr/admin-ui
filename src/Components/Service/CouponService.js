import axios from "axios";

export default class CouponService {
  baseUri = process.env.REACT_APP_COUPONS;
  config = {
    headers: {},
  };

  // method      : POST
  // path        : /app/coupon
  // description : Create new coupon
  // access      : Protected

  findBySearch(body) {
    return axios.get(`${this.baseUri}/search/applicable/`, {
      params: {
        searchBy: body,
        sellerId: "",
      },
    });
  }
  createCoupon(body) {
    return axios.post(`${this.baseUri}/coupon`, body, this.config);
  }

  // method      : PUT
  // path        : /app/coupon
  // description : update the coupon
  // access      : Protected

  updateCoupon(body, id) {
    return axios.put(`${this.baseUri}/coupon/${id}`, body, this.config);
  }

  // method      : DELETE
  // path        : /app/coupon/{id}
  // description : delete Coupon by passing its Id
  // access      : Protected

  deleteCoupon(id) {
    return axios.delete(`${this.baseUri}/coupon/${id}`, this.config);
  }
  // method      : GET
  // path        : /app/coupon/{id}
  // description : get particular coupon details by passing it's Id
  // access      : Protected

  getCouponById(id) {
    return axios.get(`${this.baseUri}/coupon/${id}`, this.config);
  }
  // method      : GET
  // path        : /app/coupons
  // description : get All Coupons
  // access      : Protected

  getAllCoupons() {
    return axios.get(`${this.baseUri}/coupons`, this.config);
  }

  // method      : GET
  // path        : /app/activatecouponststus/{id}
  // description : update coupon Status to ACTIVE
  // access      : Protected

  updateCouponStatus(id, status) {
    console.log(status);
    return axios.put(`${this.baseUri}/coupon/status/${id}`, {});
  }

  // method      : GET
  // path        : /app/activatecouponststus/{id}
  // description : update coupon Status to INACTIVE
  // access      : Protected

  deActivateCouponStatus(id) {
    return axios.put(`${this.baseUri}/coupon/status/${id}`, {});
  }
}
