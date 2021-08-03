import {DELETE_FORM_COMANDA} from "./types";

import FormService from '../services/form.service'


export const removeOneComanda = (id) => async (dispatch) => {
    try {
      await FormService.removeOneComanda(id);
  
      dispatch({
        type: DELETE_FORM_COMANDA,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };