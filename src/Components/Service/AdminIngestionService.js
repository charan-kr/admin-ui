import axios from "axios";
import { HelperService } from "./HelperService";

export default class AdminIngestionService extends HelperService {
  baseUrl = process.env.REACT_APP_INGESTION_POOL;

  // method      : POST
  // path        : /app/imageBucket
  // description : Create new banner group
  // access      : Protected
  getAdminProducts() {
    const url = `${this.baseUrl}/productcatalogs`;
    const config = this.getConfig();
    return axios
      .get(url, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  // method      : POST
  // path        : /app/imageBucket
  // description : Create new banner group
  // access      : Protected
  addAdminIngestion(adminIngestion) {
    const url = `${this.baseUrl}/productcatalog`;
    const body = adminIngestion;
    const config = this.getConfig();
    return axios
      .post(url, body, config)
      .then((res) => res.data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  // method      : POST
  // path        : /app/imageBucket
  // description : Create new banner group
  // access      : Protected
  getAdminProductById(id) {
    return axios
      .get("data/admin.json")
      .then((res) => res.data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
  // method      : POST
  // path        : /app/imageBucket
  // description : Create new banner group
  // access      : Protected
  getNewAdminIngestion() {
    const url = `${this.baseUrl}/productattributes`;
    const config = this.getConfig();
    return axios
      .get(url, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  // method      : POST
  // path        : /app/imageBucket
  // description : Create new banner group
  // access      : Protected
  getProductConfigurationById(id) {
    const url = `${this.baseUrl}/productattributes/${id}`;
    const config = this.getConfig();
    return axios
      .get(url, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  // method      : POST
  // path        : /app/imageBucket
  // description : Create new banner group
  // access      : Protected
  getSecoundPage() {
    const url = `${this.baseUrl}/products`;
    const config = this.getConfig();
    return axios
      .get(url, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
  // method      : POST
  // path        : /app/imageBucket
  // description : Create new banner group
  // access      : Protected
  deleteProductConfigurationById(id) {
    const url = `${this.baseUrl}/productattributes/${id}`;
    const config = this.getConfig();
    return axios
      .delete(url, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  // method      : POST
  // path        : /app/imageBucket
  // description : Create new banner group
  // access      : Protected
  updateIngestionConfiguration(id, data) {
    const url = `${this.baseUrl}/productattributes/` + id + "/" + data;
    const config = this.getConfig();
    return axios
      .put(url, {}, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  // method      : POST
  // path        : /app/imageBucket
  // description : Create new banner group
  // access      : Protected
  deleteIngestionProductConfigurationById(id) {
    const url = `${this.baseUrl}/product/${id}`;
    const config = this.getConfig();
    return axios
      .delete(url, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
}
