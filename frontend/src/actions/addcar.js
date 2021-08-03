import { CAR_ADDED, CAR_NOT_ADDED, SET_MESSAGE } from './types';

import CarService from '../services/car.service';

export const add = (name,
    price,
    year,
    category,
    kms,
    engine,
    cc,
    hp,
    transmission,
    urlImage1,
    urlImage2,
    urlImage3,
    urlImage4,
    urlImage5,
    urlImage6,
    urlImage7,
    features) => (dispatch) => {
        return CarService.add(name,
            price,
            year,
            category,
            kms,
            engine,
            cc,
            hp,
            transmission,
            urlImage1,
            urlImage2,
            urlImage3,
            urlImage4,
            urlImage5,
            urlImage6,
            urlImage7,
            features).then((response) => {
                dispatch({
                    type: CAR_ADDED,
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
                        type: CAR_NOT_ADDED,
                    });

                    dispatch({
                        type: SET_MESSAGE,
                        payload: message,
                    });

                    return Promise.reject();
                }
            );
    };