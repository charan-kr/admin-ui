import { Component } from "react";
import axios from "axios";

export class PromotionService extends Component {
  baseUri = process.env.REACT_APP_PROMOTIONS;

  getAllPromotions() {
    return axios.get(`${this.baseUri}/promotionoffers`);
  }
  getPromotionsDetailsById(id) {
    return axios.get(`${this.baseUri}/promotionoffer/` + id);
  }
  getPromotionsSearchFilter(search, value) {
    return axios.get(
      `${this.baseUri}/promotion/search/` + search + "/" + value
    );
  }

  getPromotionsOfferSearchFilter(search, value) {
    console.log(search, value);
    //localhost:9090/app/promotion/search/category/Electronics

    return axios.get(
      `${this.baseUri}/promotion/search/` + search + "/" + value
    );
  }

  addPromotionsData(data) {
    return axios.post(`${this.baseUri}/promotionoffer/`, data);
  }
  updatePromotionsuration(id, data) {
    return axios.put(`${this.baseUri}/promotionoffer/` + id, data);
  }
  deletePromotionsDetailsById(id) {
    return axios.delete(`${this.baseUri}/promotionoffer/` + id);
  }
}
