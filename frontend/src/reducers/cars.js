import {
    DELETE_CAR,
    UPDATE_CAR
  } from "../actions/types";
  
  const initialState = [];
  
  function carReducer(cars = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
  
      case UPDATE_CAR:
        return cars.map((car) => {
          if (car.id === payload.id) {
            return {
              ...car,
              ...payload,
            };
          } else {
            return car;
          }
        });
  
      case DELETE_CAR:
        return cars.filter(({ id }) => id !== payload.id);
      default:
        return cars;
    }
  };
  
  export default carReducer;