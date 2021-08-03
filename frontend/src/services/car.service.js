import axios from 'axios';
import authHeader from './auth-header'


const API_URL = "http://localhost:8080/";

const getAddPage = () => {
    return axios.get(API_URL + "add-car", { headers: authHeader() });
  };



const add = (name,
    price,
    year,
    category,
    kms,
    engine,
    cc,
    hp,
    transmission,
    urlImage1,
    urlImage2,
    urlImage3,
    urlImage4,
    urlImage5,
    urlImage6,
    urlImage7,
    features) => {
    return axios.post(API_URL + "add-car", {
    name,
    price,
    year,
    category,
    kms,
    engine,
    cc,
    hp,
    transmission,
    urlImage1,
    urlImage2,
    urlImage3,
    urlImage4,
    urlImage5,
    urlImage6,
    urlImage7,
    features
    });
}

const getOne = id => {
        return axios.get(API_URL + `inventory/car/${id}`);
}

const getAll = () => {
    return axios.get(API_URL+ 'inventory');
}

const getByName = name => {
    return axios.get(API_URL + `inventory?name=${name}`);
}

const removeOne = id => {
    return axios.delete(API_URL + `inventory/car/${id}`)
}

const update = (id, data) => {
    return axios.put(API_URL + `inventory/car/${id}`, data);
}


// const getAll = () => {
//     return axios.get("http://localhost:8080/inventory");
// }

export default {
    getAddPage,
    add,
    getOne,
    getAll,
    getByName,
    removeOne,
    update
};