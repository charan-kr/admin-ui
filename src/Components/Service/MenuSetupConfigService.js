import axios from "axios";

export class MenuSetupConfigService {
  baseUrl = process.env.REACT_APP_BASE_URL;
  getMenuSetupConfigDetails() {
    return axios.get(`${this.baseUrl}/menusetup/`);
  }
  getMenuSetupConfigDetailsById(id) {
    return axios.get(`${this.baseUrl}/menusetup/` + id);
  }
  getMenuSetupConfigSearchFilter(search, value) {
    return axios.get(
      `${this.baseUrl}/menusetup/search/` + search + "/" + value
    );
  }

  addMenuSetUpConfiguration(data) {
    return axios.post(`${this.baseUrl}/menusetup/`, data);
  }
  updateMenuSetUpConfiguration(id, data) {
    return axios.put(`${this.baseUrl}/menusetup/` + id, data);
  }
  deleteMenuSetupConfigDetailsById(id) {
    return axios.delete(`${this.baseUrl}/menusetup/` + id);
  }
}
