import axios from "axios";
import { HelperService } from "./HelperService";

export default class CategoryService extends HelperService {
  baseUri = process.env.REACT_APP_CATEGORY;

  createCategory(body) {
    const url = `${this.baseUri}/category`;
    const data = body;
    const config = this.getConfig();

    return axios
      .post(url, data, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  getAllCategories() {
    const url = `${this.baseUri}/categories`;
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
  getAllActiveCategories() {
    const url = `${this.baseUri}/categorynames`;
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

  updateCategory(body) {
    const url = `${this.baseUri}/category/${body.categoryId}`;
    const data = body;
    const config = this.getConfig();

    return axios
      .put(url, data, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  DeleteCategory(body) {
    const url = `${this.baseUri}/category/${body.categoryId}`;
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
  updateStatus(id) {
    const url = `${this.baseUri}/status/${id}`;
    const data = {};
    const config = this.getConfig();

    return axios
      .put(url, data, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
}
