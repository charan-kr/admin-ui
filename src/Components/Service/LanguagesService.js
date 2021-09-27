import axios from "axios";
import HelperService from "./HelperService";

export default class LanguagesService extends HelperService {
  baseUri = process.env.REACT_APP_PRODUCT_LANGUAGE;

  getProductlanguageConfigurationDetails() {
    return axios
      .get(`${this.baseUri}/productlanguageconfiguration`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        this.handleErrors(error);
      });
  }
  getProductlanguageConfigurationDetailsById(id) {
    return axios
      .get(`${this.baseUri}/productlanguageconfiguration/` + id)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        this.handleErrors(error);
      });
  }

  addProductlanguageConfiguration(data) {
    return axios
      .post(`${this.baseUri}/productlanguageconfiguration`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        this.handleErrors(error);
      });
  }
  updateProductlanguageConfiguration(id, data) {
    return axios
      .put(`${this.baseUri}/productlanguageconfiguration/${id}`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        this.handleErrors(error);
      });
  }
  deleteProductlanguageConfigurationDetailsById(id) {
    return axios
      .delete(`${this.baseUri}/productlanguageconfiguration/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        this.handleErrors(error);
      });
  }
}
