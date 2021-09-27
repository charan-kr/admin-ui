import axios from "axios";
import { HelperService } from "./HelperService";

export default class AdminIngestionService extends HelperService {
  baseUrl = process.env.REACT_APP_PRODUCT_ATTRIBUTE_CONFIG;

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
  getAllIngestionConfiguration() {
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
  updateProductConfiguration(id, data) {
    return axios
      .put(`${this.baseUrl}/productattributes/${id}`, data)
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
  addIngestionConfiguration(data) {
    return axios
      .post(`${this.baseUrl}/productattributes`, data)
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

  getManufacturerBySubCategory(subCategoryName) {
    const url = `${this.baseUrl}/productattributes/manufacturers`;
    const params = { subCategoryName };

    return axios
      .get(url, this.getConfig(params))
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
  getModelsByManufacturer(manufacturer) {
    const url = `${this.baseUrl}/productattributes/models`;
    const params = { manufacturer };

    return axios
      .get(url, this.getConfig(params))
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  getAttributesByModelAndManufacturer(
    categoryId,
    manufacturer,
    model,
    subCategoryId
  ) {
    return axios
      .get(`${this.baseUrl}/search/attributekeys`, {
        params: {
          categoryId,
          manufacturer,
          model,
          subCategoryId,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
}
