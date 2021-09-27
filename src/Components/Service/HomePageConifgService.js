import axios from "axios";
import HelperService from "./HelperService";

export class HomePageConfigService extends HelperService {
  baseUri = `${process.env.REACT_APP_HOME_PAGE_CONFIG_URL}`;

  createHomePageConfig(body) {
    const url = `${this.baseUri}/homepageConfig/create`;
    const config = this.getConfig();
    return axios
      .post(url, body, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  getAllHomePageConfig() {
    const url = `${this.baseUri}/homepageConfig/palettes`;
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

  getHomePageConfigById(paletterId) {
    const url = `${this.baseUri}/homepageConfig/palette/${paletterId}`;
    const config = this.getConfig();
    config.headers.paletterId = paletterId;
    return axios
      .get(url, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  updateHomePageConfigById(paletterId, body) {
    const url = `${this.baseUri}/homepageConfig/update`;
    const config = this.getConfig();
    config.headers.paletterId = paletterId;
    return axios
      .put(url, { ...body, paletterId: paletterId }, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  deleteHomePageConfigById(paletterId) {
    const url = `${this.baseUri}/homepageConfig/palette/${paletterId}`;
    const config = this.getConfig();
    config.headers.paletterId = paletterId;
    return axios
      .delete(url, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  updateHomePageConfigStatus(paletterId, isActive = false) {
    const url = `${this.baseUri}/homepageConfig/activation/${paletterId}?isActive=${isActive}`;
    const config = this.getConfig();
    config.headers.paletterId = paletterId;
    return axios
      .put(url, {}, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
  changeHomePageConfigDefault(paletterId, isActive = false) {
    const url = `${this.baseUri}/homepageConfig/default/${paletterId}?isDefault=${isActive}`;
    const config = this.getConfig();
    config.headers.paletterId = paletterId;
    return axios
      .put(url, {}, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
}

export default new HomePageConfigService();
