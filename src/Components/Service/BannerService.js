import axios from "axios";
import { HelperService } from "./HelperService";

export default class BannerService extends HelperService {
  baseUri = `${process.env.REACT_APP_BANNER_URL}`;

  // method      : POST
  // path        : /app/imageBucket
  // description : Create new banner group
  // access      : Protected

  createBanner(body) {
    const { name, bannerCode, formData } = body;
    return axios
      .post(
        `${this.baseUri}/bannerImage?bannerCode=${bannerCode}&name=${name}`,
        formData,
        this.getConfig()
      )
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

  getByBannerCode(bannerCode) {
    return axios
      .get(
        `${this.baseUri}/imageBucketByBannerCode/${bannerCode}`,
        this.getConfig()
      )
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
    return axios
      .get(`${this.baseUri}/searchdb/${keyword}`, this.getConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
  // method      : GET
  // path        : /app/imageBuckets
  // description : get All Banners
  // access      : Protected

  getAllBanners() {
    return axios
      .get(`${this.baseUri}/bannerImages`, this.getConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  // method      : GET
  // path        : /app/imageBuckets
  // description : get All Banners that are in active state
  // access      : Protected

  getAllActiveBanners() {
    return axios
      .get(`${this.baseUri}/bannerImagesByIsActive`, this.getConfig())
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

  deleteBannerCode(bannerCode) {
    return axios
      .delete(`${this.baseUri}/bannerImage/${bannerCode}`, this.getConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
}
