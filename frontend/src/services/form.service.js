import axios from 'axios';
import authHeader from './auth-header'


const API_URL = "http://localhost:8080/";

const addRequest = (name,
    price,
    year,
    kms,
    transmission,
    engine,
    userId
) => {
    return axios.post(API_URL + "forms/add/request/", {
        name,
        price,
        year,
        kms,
        transmission,
        engine,
        userId
    });
}

const addSale = (name,
    hp,
    year,
    kms,
    transmission,
    engine,
    urlImage1,
    urlImage2,
    urlImage3,
    userId
) => {
    return axios.post(API_URL + "requests/sales/add", {
        name,
        hp,
        year,
        kms,
        transmission,
        engine,
        urlImage1,
        urlImage2,
        urlImage3,
        userId
    });
}

const getOne = id => {
    return axios.get(API_URL + `forms/${id}`);
}

const getAll = () => {
    return axios.get(API_URL + 'forms');
}

const getOneSale = id => {
    return axios.get(API_URL + `requests/sales/${id}`);
}

const getAllSale = () => {
    return axios.get(API_URL + 'requests/sales');
}

const removeOneVanzare = id => {
    return axios.delete(API_URL + `requests/${id}`)
}

const removeOneComanda = id => {
    return axios.delete(API_URL + `forms/${id}`)
}


export default {
    addRequest,
    getAll,
    getOne,
    getOneSale,
    getAllSale,
    addSale,
    removeOneVanzare,
    removeOneComanda
};