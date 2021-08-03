import {DELETE_CAR} from "./types";

import CarService from '../services/car.service'


export const deleteCar = (id) => async (dispatch) => {
    try {
      await CarService.removeOne(id);
  
      dispatch({
        type: DELETE_CAR,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };