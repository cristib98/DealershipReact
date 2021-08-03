import { FAV_ADDED, FAV_NOT_ADDED, SET_MESSAGE } from './types';

import Service from '../services/favorite_cars.service';

export const addFav = (carId,
    userId
    ) => (dispatch) => {
        return Service.addFav(
            carId,
            userId
            ).then((response) => {
                dispatch({
                    type: FAV_ADDED,
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
                        type: FAV_NOT_ADDED,
                    });

                    dispatch({
                        type: SET_MESSAGE,
                        payload: message,
                    });

                    return Promise.reject();
                }
            );
    };