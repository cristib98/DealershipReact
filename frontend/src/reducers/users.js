import {
    UPDATE_USER
  } from "../actions/types";
  
  const initialState = [];
  
  function userReducer(users = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      
      case UPDATE_USER:
        return users.map((user) => {
          if (user.id === payload.id) {
            console.log("am ajuns aici")
            return {
              ...user,
              ...payload,
            };
          } else {
            return user;
          }
        });
  
      default:
        return users;
    }
  };
  
  export default userReducer;