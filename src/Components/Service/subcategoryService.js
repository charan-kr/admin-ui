import axios from "axios";
import HelperService from "./HelperService";

export default class subcategoryService extends HelperService {
  baseUri = process.env.REACT_APP_SUB_CATEGORY;

  createsubCategory(body) {
    const url = `${this.baseUri}/subcategory`;
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

  getAllsubCategories() {
    const url = `${this.baseUri}/subcategories`;
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

  getAllsubCategoriesByCategoryId(categoryId) {
    const url = `${this.baseUri}/subcategories/${categoryId}`;
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

  deletesubCategory(subcategoryid) {
    const url = `${this.baseUri}/subcategory/${subcategoryid}`;
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

  updatesubCategory(body) {
    const url = `${this.baseUri}/subcategory/${body.subCategoryId}`;
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

  updateStatus(id) {
    const url = `${this.baseUri}/subcategory/status/${id}`;
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
