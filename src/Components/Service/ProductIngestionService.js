import axios from "axios";
import HelperService from "./HelperService";

export default class ProductIngestionService extends HelperService {
  baseUrl = process.env.REACT_APP_PRODUCT_INGESTION;

  getProductIngestionDetails() {
    return axios
      .get(`${this.baseUrl}/products`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        this.handleErrors(error);
      });
  }
  deleteIngestionProductConfigurationById(id) {
    return axios
      .delete(`${this.baseUrl}/product/` + id)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        this.handleErrors(error);
      });
  }
  addProductIngestion(body) {
    const data = {
      ...body,
      created_by: this.getEmail(),
    };
    return axios
      .post(`${this.baseUrl}/product`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        this.handleErrors(error);
      });
  }
  updateProductIngestionConfiguration(id, body) {
    const data = {
      ...body,
      modified_by: this.getEmail(),
    };
    return axios
      .put(`${this.baseUrl}/product/` + id, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        this.handleErrors(error);
      });
  }

  updateProductDetailsById(productId, lang, data) {
    return axios
      .put(`${this.baseUrl}/language/product/${productId}?lang=${lang}`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        this.handleErrors(error);
      });
  }
}
