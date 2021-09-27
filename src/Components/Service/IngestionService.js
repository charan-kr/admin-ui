import axios from "axios";
import HelperService from "./HelperService";

export default class IngestionService extends HelperService {
  baseUri = process.env.REACT_APP_PERODUCT;
  baseUrl = "http://localhost:8082/app";

  getProductCategoriesList() {
    return axios
      .get(`${this.baseUri}/categories/`)
      .then((response) => response.data);
  }

  getSubProductCategoriesList(data) {
    return axios
      .get(`${this.baseUri}/productCategorys/` + data.productCategoryName)
      .then((response) => response.data);
  }
  getIngestionDataList(categoryName, subCategoryName) {
    return axios
      .get(
        `${this.baseUri}/ingestion/productattributes/` +
          categoryName +
          "/" +
          subCategoryName
      )
      .then((res) => res.data);
  }
  getIngestionPoolKeys(key) {
    return axios.get(`${this.baseUri}/ingestionpool/search/`, {
      params: {
        key: key,
      },
    });
  }
  getIngestionPoolKeysByScope(key, scope) {
    return axios.get(
      `${this.baseUri}/ingestion/productattributes/ingestionpool/` +
        key +
        "/" +
        scope
    );
  }
  getIngestionPoolKeysByScopeForTransactionTab(scope) {
    return axios.get(
      `${this.baseUri}/ingestion/productattributes/ingestionpool/scope` +
        "/" +
        scope
    );
  }
  addProductConfiguration(data) {
    return axios.post(`${this.baseUri}/productattributes/`, data);
  }
  updateProductConfiguration(id, data) {
    return axios.put(`${this.baseUri}/productattributes/` + id, data);
  }
  getModel() {
    return axios.get("data/Model.json").then((res) => res.data.data);
  }
  getCategories() {
    return axios.get(`${this.baseUri}/categorynames`).then((res) => res.data);
  }
  getCategoriesb(data) {
    return axios
      .get(`${this.baseUri}/search/productattributesconfiguration`, data)
      .then((res) => res.data);
  }
  getSubCategories(data) {
    return axios.get(`${this.baseUri}/subcategories/` + data.categoryId);
  }
  AddIngestionConfiguration(data) {
    return axios.post(`${this.baseUri}/productattributes/`, data);
  }
  getIngestionAttributes() {
    return axios.get(`${this.baseUri}/ingestionpool/`);
  }
  addIngestionData(data) {
    return axios.post(`${this.baseUri}/product`, data);
  }

  addProductIngestion(data) {
    return axios.post(`${this.baseUri}/product`, data);
  }
  getProductIngestionById(id) {
    return axios.get(`${this.baseUri}/product/` + id);
  }
  updateProductIngestionConfiguration(id, data) {
    return axios.put(`${this.baseUri}/product/` + id, data);
  }
  addDVNProductIngestion(data) {
    return axios.post(`${this.baseUri}/dolphinsvariant/`, data);
  }
  getAllDVNIngestion(data) {
    return axios.get(`${this.baseUri}/dolphinsvariants/`);
  }
  getDVNIngestionById(id) {
    return axios.get(`${this.baseUri}/dolphinsvariant/` + id);
  }
  updateDVNConfiguration(id, data) {
    return axios.put(`${this.baseUri}/dolphinsvariant/` + id, data);
  }
  deleteDVNIngestionlDetailsById(id) {
    return axios.delete(`${this.baseUri}/dolphinsvariant/${id}`);
  }
  getCombinationDetails(id) {
    return axios.get(`${this.baseUri}/search/combination/` + id);
  }
  getDVNAttributes(id) {
    return axios.get(`${this.baseUri}/search/combination/` + id);
  }

  getSerachDVNAttributesSearchProducts(cId, manufacturer, model, subId) {
    return axios.get(`${this.baseUri}/search/attributekeys`, {
      params: {
        categoryId: cId,

        manufacturer: manufacturer,
        model: model,
        subCategoryId: subId,
      },
    });
  }
  getDVNManufacturerAndModel(id) {
    return axios.get(`${this.baseUri}/product/` + id);
  }
  getSearchAttributesForProductIngestion(id) {
    return axios.get(`${this.baseUri}/search/dvnattributes/` + id);
  }

  getProductIngestionDetails() {
    return axios.get(`${this.baseUri}/products`);
  }

  deleteProductConfigurationById(id) {
    return axios.delete(`${this.baseUri}/productattributes/` + id);
  }
  deleteIngestionProductConfigurationById(id) {
    return axios.delete(`${this.baseUri}/product/` + id);
  }
  addSKUConfiguaration(data) {
    return axios.post(`${this.baseUri}/dsku/`, data);
  }
  getSKUConfiguration() {
    return axios.get(`${this.baseUrl}/dskus/`);
  }
  deleteSKUDetailsById(id) {
    //http://localhost:8080/app/ingestionpool/a342941b-1315-49a1-8283-92131628dbc2
    return axios.delete(`${this.baseUri}/dsku/${id}`);
  }
  getSKUDetailsById(id) {
    return axios.get(`${this.baseUrl}/dsku/` + id);
  }
  updateSKUById(id, data) {
    return axios.put(`${this.baseUri}/dsku/${id}`, data);
  }

  addProductLanguageConfig(data) {
    return axios.post(`${this.baseUri}/productlanguageconfiguration/`, data);
  }

  getProductLanguageConfig() {
    return axios.get(`${this.baseUri}/productlanguageconfiguration`);
  }

  getProductLanguageConfigById(id) {
    return axios.get(`${this.baseUri}/productlanguageconfiguration/` + id);
  }
  deletetProductLanguageConfigById(id) {
    return axios.delete(`${this.baseUri}/productlanguageconfiguration/` + id);
  }
  updateProductLanguageConfig(id, data) {
    return axios.put(
      `${this.baseUri}/productlanguageconfiguration/${id}`,
      data
    );
  }

  // Nwely added
  getProductDetailsById(productId, lang) {
    return axios.get(
      `${this.baseUri}/language/product/${productId}?lang=${lang}`
    );
  }
  updateProductDetailsById(productId, lang, data) {
    return axios.put(
      `${this.baseUri}/language/product/${productId}?lang=${lang}`,
      data
    );
  }
  getDvnDetailsById(dvnId, lang) {
    return axios.get(`${this.baseUri}/language/dvn/${dvnId}?lang=${lang}`);
  }
  updateDvnDetailsById(dvnId, lang, data) {
    return axios.put(
      `${this.baseUri}/language/dvn/${dvnId}?lang=${lang}`,
      data
    );
  }
  getAllDVNIngestionByProductId(productId) {
    return axios.get(`${this.baseUri}/dolphinsvariants/${productId}`);
  }
  getProductsBySubCategory(category, subCategory) {
    const url = `${this.baseUri}/product/productids`;
    const params = { category, subCategory };
    return axios
      .get(url, this.getConfig(params))
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
  getAllDVNByProductId(productId) {
    const url = `${this.baseUri}/dvn/dvnids`;
    const params = { productId };
    return axios
      .get(url, this.getConfig(params))
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
  getManufacturerBySubCategory(subCategoryName) {
    const url = `${this.baseUri}/productattributes/manufacturers`;
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
    const url = `${this.baseUri}/productattributes/models`;
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
}
