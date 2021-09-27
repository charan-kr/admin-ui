import axios from "axios";
import { convertDateToString } from "../../utils/convertDateToString";
import HelperService from "./HelperService";

export default class SearchFilterService extends HelperService {
  baseUri = process.env.REACT_APP_SEARCH_FILTER;

  getAllSearchFilters() {
    return axios
      .get(`${this.baseUri}/searchfilters`, this.getConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
  createSearchFilter(body) {
    const data = {
      ...body,
      created_by: this.getEmail(),
      created_dt: convertDateToString(new Date(), "dd-mm-yyyy HH:MM A"),
      modified_by: this.getEmail(),
      modified_dt: convertDateToString(new Date(), "dd-mm-yyyy HH:MM A"),
    };
    return axios
      .post(`${this.baseUri}/searchfilter`, data, this.getConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  getSearchFilterById(id) {
    return axios
      .get(`${this.baseUri}/searchfilter/${id}`, this.getConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
  getSearchFilterByCatAndSubCatId(categoryId, subCategoryId) {
    return axios
      .get(
        `${this.baseUri}/searchfilter?categoryId=${categoryId}&subCategoryId=${subCategoryId}`,
        this.getConfig()
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  updateSearchFilter(id, body) {
    const data = {
      ...body,
      modified_by: this.getEmail(),
      modified_dt: convertDateToString(new Date(), "dd-mm-yyyy HH:MM A"),
    };
    return axios
      .put(`${this.baseUri}/searchfilter/${id}`, data, this.getConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  deleteSearchFilter(id) {
    return axios
      .delete(`${this.baseUri}/searchfilter/${id}`, this.getConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
}
