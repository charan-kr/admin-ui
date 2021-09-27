import axios from "axios";
import { HelperService } from "./HelperService";

export default class SkuIngestionService extends HelperService {
  baseUri = process.env.REACT_APP_DSKU;

  getAllDskus() {
    return axios.get(`${this.baseUri}/dskus`, this.getConfig());
  }
  getAllDskusByDvnId(dskuId) {
    return axios.get(`${this.baseUri}/dskus/${dskuId}`, this.getConfig());
  }
}
