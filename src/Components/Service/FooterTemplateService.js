import axios from "axios";

export class FooterTemplateService {
  baseURI = `${process.env.REACT_APP_NOTIFICATION_URL}/api/v1`;

  getAllFooterTemplates() {
    return axios.get(`${this.baseURI}/footers`);
  }
 
  postFooterTemplate(data) {
    return axios.post(`${this.baseURI}/footer`, data);
    }
    
  updateFooterTemplate(id, data) {
    return axios.put(`${this.baseURI}/footer/${id}`, data);
    }
    
  deleteFooterTemplate(id) {
    return axios.delete(`${this.baseURI}/footer/${id}`);
  }
}
