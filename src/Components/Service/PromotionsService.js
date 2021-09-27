import axios from "axios";

export default class PromotionsService {
  baseUri = process.env.REACT_APP_PROMOTIONS;
  config = {
    headers: {},
  };
  findBySearch(body) {
    return axios.get(`${this.baseUri}/search/applicable/`, {
      params: {
        searchBy: body,
        sellerId: "",
      },
    });
  }
  /**
  @returns  created promotion succesfully
  @description  Create new promotion
  @method POST
 */
  createPromotion(body) {
    return axios.post(`${this.baseUri}/promotion`, body, this.config);
  }
  /**
  @returns  created promotion succesfully
  @description  Create new promotion
  @method POST
 */
  uploadUsers(promoCode, data) {
    let formData = new FormData();
    data.forEach((element) => {
      formData.append("file", element);
    });
    let config = {
      //headers: { "Content-Type": "multipart/form-data" },
      header: {
        "Content-Type": "text/csv",
      },
      params: {
        promoCode: promoCode,
      },
    };
    return axios.put(`${this.baseUri}/userpromotions`, formData, config);
  }

  /**
  @returns  update promotion succesfully
  @description  update  promotion
  @method PUT
 */

  updatePromotion(body) {
    return axios.put(`${this.baseUri}/promotion`, body, this.config);
  }
  /**
  @returns  delete promotion succesfully
  @description  delete  promotion
  @method DELETE
 */

  deletePromotion(id) {
    return axios.delete(`${this.baseUri}/promotion/${id}`, this.config);
  }
  /**
  @returns  {promotion}
  @description  reuten  promotion
  @method GET
 */

  getPromotionById(id) {
    return axios.get(`${this.baseUri}/promotion/${id}`, this.config);
  }
  /**
  @returns  {promotions}
  @description  reuten  promotions
  @method GET
 */
  getAllPromotions() {
    return axios.get(`${this.baseUri}/promotions`, this.config);
  }
  /**
  @returns  {use promotions}
  @description  reuten  promotions
  @method GET
 */
  getAllUserPromotions() {
    return axios.get(`${this.baseUri}/userpromotions`, this.config);
  }
  /**
  @returns  update promotion Status 
  @description   update promotion Status to ACTIVE
  @method PUT
 */
  updatePromotionStatus(id, status) {
    console.log(status);
    return axios.put(`${this.baseUri}/promotion/status/${id}`, {});
  }
  /**
  @returns  update promotion Status to INACTIVE
  @description   update promotion Status to INACTIVE
  @method PUT
 */

  deActivatePromotionStatus(id) {
    return axios.put(
      `${this.baseUri}/deactivatepromotionststus/${id}`,
      {},
      this.config
    );
  }
}
