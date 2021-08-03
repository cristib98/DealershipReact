import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getOne = id => {
  return axios.get("http://localhost:8080" + `/profile/${id}`);
}

const getOneId = id => {
  return axios.get("http://localhost:8080" + `/user/${id}`);
}

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const update = (id, data) => {
  return axios.put("http://localhost:8080/" + `profile/${id}`, data);
}

export default {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
  update,
  getOne,
  getOneId
};