import {DELETE_FORM_VANZARE} from "./types";

import FormService from '../services/form.service'


export const removeOneVanzare = (id) => async (dispatch) => {
    try {
      await FormService.removeOneVanzare(id);
  
      dispatch({
        type: DELETE_FORM_VANZARE,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };