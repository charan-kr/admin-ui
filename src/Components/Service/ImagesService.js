import axios from "axios";

export default class ImagesService {
  baseUri = process.env.REACT_APP_IMAGE_SERVICE;

  addImagesToDVN(data) {
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
        dvnId: data.dvnId,
        order: data.order,
        type: data.type,
        view360: data.view360,
      },
    };
    return axios.post(`${this.baseUri}/image`, formData, config);
  }

  updateOrdersOfDvns(id, data) {
    return axios.put(`${this.baseUri}/image/reorder/${id}`, data);
  }

  deleteFileByOrderAndDvnId(dvnId, fileName) {
    return axios.delete(`${this.baseUri}/imagestaging/${fileName}`, {
      params: {
        dvnId: dvnId,
      },
    });
  }
  deleteAddedMediaByOrderAndDvnId(dvnId, order) {
    return axios.delete(`${this.baseUri}/image/${order}`, {
      params: {
        dvnId: dvnId,
      },
    });
  }
  getFilesByDvnId(dvnId) {
    return axios.get(`${this.baseUri}/publishedimages/${dvnId}`);
  }

  getAddedMediaToDVN(dvnId) {
    return axios.get(`${this.baseUri}/imagecontent/${dvnId}`);
  }
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return axios.post(`${this.baseUri}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return axios.get(`${this.baseUri}/files`);
  }
  addToDvn(data) {
    return axios.post(`${this.baseUri}/images`, data);
  }
}
