import axios from "axios";

export default class TableService {
  baseUri = process.env.REACT_APP_BASE_URL;
  config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // method      : GET
  // path        : /app/getAllBusinessEnquiry
  // description : get all the BusinessEnquiry in the database
  // access      : Public
  getAllBusinessEnquiry() {
    return axios
      .get(`${this.baseUri}/getAllBusinessEnquiry`, this.config)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }

  // method      : PUT
  // path        : /app/updateStatus
  // description : update the status
  // access      : Protected
  updateBusinessEnquiry(body) {
    return axios
      .put(
        `${this.baseUri}/updateStatus/${body.id}/${body.status}`,
        body,
        this.config
      )
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }

  updatereviewNotes(body) {
    const config = {
      ...this.config,
      data: {
        reviewNotes: body.reviewNotes,
      },
    };
    console.log(body);
    return axios
      .put(`${this.baseUri}/updateReviewNotes/${body.id}`, {}, config)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }
  // method      : GET
  // path        : /app/getBusinessEnquiry/{id}
  // description : get particular BusinessEnquiry details by passing it's Id
  // access      : Protected
  getSingleBusinessEnquiry(id) {
    return axios
      .get(`${this.baseUri}/getBusinessEnquiry/${id}`, this.config)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }
}
