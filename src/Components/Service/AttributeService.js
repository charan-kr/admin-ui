import axios from "axios";
import HelperService from "./HelperService";

export default class AttributeService extends HelperService {
  baseUri = process.env.REACT_APP_ATTRIBUTE_GROUPING;

  // method      : POST
  // path        : /app/imageBucket
  // description : Create new banner group
  // access      : Protected
  getIngestionPoolDetails() {
    const url = `${this.baseUri}/ingestionpool`;
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
  createAttributes(body) {
    const url = `${this.baseUri}/attributesgroup`;
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
  // method      : POST
  // path        : /app/imageBucket
  // description : Create new banner group
  // access      : Protected
  getAttribures() {
    const url = `${this.baseUri}/attributesgroups`;
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
  updateAttributes(body) {
    const url = `${this.baseUri}/attributesgroup/${body.groupId}`;
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
  // method      : POST
  // path        : /app/imageBucket
  // description : Create new banner group
  // access      : Protected
  deleteAttributes(body) {
    const url = `${this.baseUri}/attributesgroup/${body.groupId}`;
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
