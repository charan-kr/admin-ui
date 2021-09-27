import axios from "axios";
import HelperService from "./HelperService";

class UITemplateService extends HelperService {
  baseUri = `${process.env.REACT_APP_UI_TEMPLATE}`;

  createUITemplate(body) {
    const url = `${this.baseUri}/uitemplate`;
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
  getAllUITemplate() {
    const url = `${this.baseUri}/uitemplates`;
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
  getUITemplateById(templateId) {
    const url = `${this.baseUri}/uitemplate/${templateId}`;
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

  updateUITemplate(templateId, body) {
    const url = `${this.baseUri}/uitemplate/${templateId}`;
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
  deleteUITemplate(templateId) {
    const url = `${this.baseUri}/uitemplate/${templateId}`;
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

export default UITemplateService;
