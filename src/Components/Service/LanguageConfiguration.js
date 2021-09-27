import axios from "axios";
import HelperService from "./HelperService";

export default class LanguageConfiguration extends HelperService {
  baseUri = process.env.REACT_APP_DVN_LANGUAGE;

  getDvnLanguageConfigurationDetails() {
    return axios
      .get(`${this.baseUri}/dvnlanguageconfiguration`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        this.handleErrors(error);
      });
  }
  getDvnLanguageConfigurationDetailsById(id) {
    return axios
      .get(`${this.baseUri}/dvnlanguageconfiguration/` + id)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        this.handleErrors(error);
      });
  }

  addDvnLanguageConfiguration(data) {
    return axios
      .post(`${this.baseUri}/dvnlanguageconfiguration`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        this.handleErrors(error);
      });
  }
  updateDvnLanguageConfiguration(id, data) {
    return axios
      .put(`${this.baseUri}/dvnlanguageconfiguration/${id}`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        this.handleErrors(error);
      });
  }
  deleteDvnLanguageConfigurationDetailsById(id) {
    return axios
      .delete(`${this.baseUri}/dvnlanguageconfiguration/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        this.handleErrors(error);
      });
  }
}
