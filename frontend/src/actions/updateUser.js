import { UPDATE_USER } from './types';

import UserService from '../services/user.service';

export const updateUser = (id, data) => async (dispatch) => {
    try {
      const res = await UserService.update(id, data);
  
      dispatch({
        type: UPDATE_USER,
        // payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };