import axios from "axios";
import HelperService from "./HelperService";

export default class IngestionPoolService extends HelperService {
  baseUri = process.env.REACT_APP_INGESTION_POOL;

  getIngestionPoolDetails() {
    return axios
      .get(`${this.baseUri}/ingestionpool`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
  getIngestionPoolDetailsById(id) {
    return axios
      .get(`${this.baseUri}/ingestionpool/` + id)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  addIngestionPool(data) {
    return axios
      .post(`${this.baseUri}/ingestionpool/`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
  updateIngestionPool(id, data) {
    return axios
      .put(`${this.baseUri}/ingestionpool/${id}`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
  deleteIngestionPoolDetailsById(id) {
    return axios
      .delete(`${this.baseUri}/ingestionpool/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
  getIngestionPoolKeys(key) {
    return axios.get(`${this.baseUri}/ingestionpool/search`, {
      params: {
        key: key,
      },
    });
  }
}
