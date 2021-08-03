import axios from 'axios';

const API_URL = "http://localhost:8080/";

const getAll = id => {
    return axios.get(API_URL+ `favorites/${id}`);
}

const addFav = (carId,
    userId
) => {
    return axios.post(API_URL + "addFavorite", {
        carId,
        userId
    });
}

export default {
    getAll,
    addFav,
};