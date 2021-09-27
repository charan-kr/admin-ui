import axios from "axios";
import { HelperService } from "./HelperService";

export default class OrderService extends HelperService {
  baseUrl = `${process.env.REACT_APP_API_ORDER}/app`;

  getPastOrder() {
    const customerId = this.getCustomerId();
    const config = this.getConfig();

    const body = {
      fromDate: "30-01-2021 09:00 AM",
      toDate: "30-08-2021 09:00 AM",
    };
    const url = `${this.baseUrl}/pastorders/${customerId}`;
    return axios
      .post(url, body, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
  getOrdersByEmail() {
    const emailId = this.getEmailId();
    const config = this.getConfig();

    const url = `${this.baseUrl}/ordersbyemail/${emailId}`;
    return axios
      .get(url, config)
      .then((response) => {
        this.handleResponse(response);
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
  getAllOrdersByCustomerId(query) {
    const customerId = this.getCustomerId();
    const url = `${this.baseUrl}/order/customer/${customerId}?offset=${query.offset}&page=${query.page}`;
    const config = this.getConfig();
    return axios
      .get(url, config)
      .then((response) => response)
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
  placeNewOrder(body) {
    const url = `${this.baseUrl}/order`;
    const config = this.getConfig();
    return axios
      .post(url, body, config)
      .then((response) => response)
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
  getOrderByOrderId(orderId) {
    const url = `${this.baseUrl}/order/${orderId}`;
    const config = this.getConfig();
    return axios
      .get(url, config)
      .then((response) => response)
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
  cancelOrderByOrderId(orderId) {
    const url = `${this.baseUrl}/order/${orderId}`;
    const config = this.getConfig();
    return axios
      .delete(url, config)
      .then((response) => response)
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
  returnOrderByOrderId(body) {
    const url = `${this.baseUrl}/order}`;
    const config = this.getConfig();
    return axios
      .put(url, body, config)
      .then((response) => response)
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
  replaceOrderByOrderId(body) {
    const url = `${this.baseUrl}/order`;
    const config = this.getConfig();
    return axios
      .put(url, body, config)
      .then((response) => response)
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  getDeliveOptions(service) {
    const url = `${this.baseUrl}/shipping/delivery`;
    const body = service;
    const config = this.getConfig();
    return axios
      .post(url, body, config)
      .then((response) => response)
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
}
