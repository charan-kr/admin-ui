import axios from "axios";
export class IngestionTabsService {
  baseUrl = "http://localhost:8082/app";

  addBasicInformation(data) {
    return axios.post(`${this.baseUrl}/dsku/basic/`, data);
  }

  getDskuDetaisById(id) {
    alert(id)
    return axios.get(`${this.baseUrl}/dsku/${id}`);
  }
  updateBasicInformation(id, data) {
    return axios.put(`${this.baseUrl}/dsku/basic/${id}`, data);
  }
  updatePriceAndInventory(id, data) {
    return axios.put(`${this.baseUrl}/dsku/priceinventory/${id}`, data);
  }
  updatePackage(id, data) {
    return axios.put(`${this.baseUrl}/dsku/package/${id}`, data);
  }
  updateShipping(id, data) {
    return axios.put(`${this.baseUrl}/dsku/shipping/${id}`, data);
  }
  updateReturn(id, data) {
    return axios.put(`${this.baseUrl}/returnpolociy/${id}`, data);
  }
}
