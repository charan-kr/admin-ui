import axios from "axios";
import HelperService from "./HelperService";


export default class ProductService extends HelperService {
  baseUri = 'http://35.200.201.75:8092/app'
  SECRET_CORRELATION_ID = "89e6d233-15c1-4d17-b7d7-95a948988cea";

  getProductByWebId(
    productId = "D00107NSKARCZ45",
    webId = "D00107NSKARCZ45007"
  ) {
    const rgs =
      "PRODUCT_RESPONSE,IMAGE_RESPONSE,REVIEWSANDRATINGS_RESPONSE,DVN_RESPONSE,DSKU_RESPONSE,PRICE_RESPONSE,INVENTORY_RESPONSE,SELLER_RESPONSE";

    const url = `${this.baseUri}/productDetails?rgs=${rgs}`;
    const body = {
      mediumweightProductContexts: [
        {
          productId,
          dvnId: webId,
        },
      ],
    };
    const config = this.getConfig(rgs);

    config.headers = {
      ...config.headers,
      correlation_id: this.SECRET_CORRELATION_ID,
      pds_client_id: this.SECRET_CORRELATION_ID,
    };

    return axios
      .post(url, body, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
}
