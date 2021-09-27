import axios from "axios";

export class EmailTemplateService {
  baseUri = process.env.REACT_APP_BASE_URL;

  getAllEmailTemplates() {
    return axios.get(`${this.baseUri}/emailtemplate`);
  }
  getEmailTemplateDetailsById(id) {
    return axios.get(`${this.baseUri}/emailtemplate/template/` + id);
  }

  addEmailTemplate(data) {
    return axios.post(`${this.baseUri}/emailtemplate/template/`, data);
  }
  updateEmailTemplate(id, data) {
    return axios.put(`${this.baseUri}/emailtemplate/template/${id}`, data);
  }
  deleteEmailTemplateDetailsById(id) {
    //http://localhost:8080/app/emailtemplate/a342941b-1315-49a1-8283-92131628dbc2
    console.log(typeof id);
    return axios.delete(`${this.baseUri}/emailtemplate/template/${id}`);
  }

  getEmailTemplateSearchFilter(search, value) {
    return axios.get(
      `${this.baseUri}/emailtemplate/template/search/` + search + "/" + value,
      {
        params: {
          offset: 0,
          page: 1,
        },
      }
    );
  }
}
