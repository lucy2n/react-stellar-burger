import { REGISTER_FALIED, REGISTER_SUCCESS, REGISTER_REQUEST } from "../actions/register"

const registerInitialState = {
   password: '',
   name: '',
   email: '',
   registerRequest: false,
   registerFailed: false,
}

export const registerReducer = (state = registerInitialState, action) => {
   switch (action.type) {
       case REGISTER_REQUEST: {
           return {
               ...state, 
               registerRequest: true,
           }
       }
       case REGISTER_SUCCESS: {
           return {
               ...state, 
               registerFailed: false, 
               password: action.password, 
               registerRequest: false,
           }
       }
       case REGISTER_FALIED: {
           return {
               ...state,
               registerFailed: true,
           }
       }
       default: {
           return state
       }
   }
}