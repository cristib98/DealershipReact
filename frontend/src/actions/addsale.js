import { SALE_ADDED, SALE_NOT_ADDED, SET_MESSAGE } from './types';

import FormService from '../services/form.service';

export const addSale = (name,
    hp,
    year,
    kms,
    transmission,
    engine,
    urlImage1,
    urlImage2,
    urlImage3,
    userId) => (dispatch) => {
        return FormService.addSale(name,
            hp,
            year,
            kms,
            transmission,
            engine,
            urlImage1,
            urlImage2,
            urlImage3,
            userId).then((response) => {
                dispatch({
                    type: SALE_ADDED,
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
                        type: SALE_NOT_ADDED,
                    });

                    dispatch({
                        type: SET_MESSAGE,
                        payload: message,
                    });

                    return Promise.reject();
                }
            );
    };