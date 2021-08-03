import { REQUEST_ADDED, REQUEST_NOT_ADDED, SET_MESSAGE } from './types';

import FormService from '../services/form.service';

export const addRequest = (name,
    price,
    year,
    kms,
    transmission,
    engine,
    userId) => (dispatch) => {
        return FormService.addRequest(name,
            price,
            year,
            kms,
            transmission,
            engine,
            userId).then((response) => {
                dispatch({
                    type: REQUEST_ADDED,
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: response.data.message,
                });

                return Promise.resolve();
            },
                (error) => {
                    const message =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    dispatch({
                        type: REQUEST_NOT_ADDED,
                    });

                    dispatch({
                        type: SET_MESSAGE,
                        payload: message,
                    });

                    return Promise.reject();
                }
            );
    };