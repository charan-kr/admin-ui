import axios from "axios";
import { HelperService } from "./HelperService";

export default class AdvertiseService extends HelperService {
  baseUri = `${process.env.REACT_APP_BANNER_URL}`;

  // method      : POST
  // path        : /app/imageBucket
  // description : Create new banner group
  // access      : Protected
  createAdvertisement(body) {
    const { name, advertisementCode, formData } = body;
    const url = `${this.baseUri}/advertisementImage`;
    const data = formData;
    const params = { advertisementCode, name };
    const config = this.getConfig(params);
    return axios
      .post(url, data, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  // path        : /app/imageBucketByBannerCode/:bannerCode
  // description : update the searchdb
  // access      : Protected
  getByAdvertisementCode(advertisementCode) {
    const url = `${this.baseUri}/advertisementImageByAdvertisementCode/${advertisementCode}`;
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

  // method      : GET
  // path        : /app/imageBucketBySeachKey/:keyword
  // description : Get list of banners conatining keyword
  // access      : Protected
  getByKeyword(keyword) {
    const url = `${this.baseUri}/searchdb/${keyword}`;
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
  // method      : GET
  // path        : /app/advertisementImages
  // description : get All Banners
  // access      : Protected
  getAllAdvertisement() {
    const url = `${this.baseUri}/advertisementImages`;
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

  // method      : GET
  // path        : /app/advertisementImagesByIsActive
  // description : get All Banners that are in active state
  // access      : Protected
  getAllActiveAdvertisement() {
    const url = `${this.baseUri}/advertisementImagesByIsActive`;
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

  // method      : DELETE
  // path        : /app//bannerImage/{bannerCode}
  // description : get All Banners that are in active state
  // access      : Protected
  deleteAdvertisementCode(bannerCode) {
    const url = `${this.baseUri}/bannerImage/${bannerCode}`;
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
