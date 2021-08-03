import { UPDATE_CAR } from './types';

import CarService from '../services/car.service';

export const updateCar = (id, data) => async (dispatch) => {
    try {
      const res = await CarService.update(id, data);
  
      dispatch({
        type: UPDATE_CAR,
        // payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };