import axios from "axios";
import { HelperService } from "./HelperService";

export default class ImagesStageService extends HelperService {
  baseUri = process.env.REACT_APP_IMAGE_SERVICE;

  addStageMediaToDVN(data) {
    const uploadedBy = this.getUserName() || "praneeth";
    let formData = new FormData();
    data.files.forEach((element) => {
      formData.append("files", element);
    });
    let config = {
      //headers: { "Content-Type": "multipart/form-data" },
      header: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        DVNId: data.dvnId,
        order: data.order,
        type: data.type,
        view360: data.view360,
        status: "Not Published",
        uploadedBy,
      },
    };
    return axios.post(`${this.baseUri}/imagestaging`, formData, config);
  }

  updatePublishMedia(id, fileName, status) {
    return axios.put(`${this.baseUri}/imagestaging/${id}`, {
      fileName: fileName,
      status: status,
    });
  }

  deleteStageMediaByFileNameAndDvnId(fileName, dvnId) {
    return axios.delete(`${this.baseUri}/imagestaging/${fileName}`, {
      params: {
        dvnId: dvnId,
      },
    });
  }
  getStageMediaByDvnId(dvnId) {
    return axios.get(`${this.baseUri}/unpublishedimages/${dvnId}`);
  }
}
