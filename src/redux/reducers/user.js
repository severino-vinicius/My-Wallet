// Esse reducer será responsável por tratar as informações da pessoa usuária
import USER_REQUEST_LOGIN from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '', // String que armazena o e-mail da ppessoa usuaria
};

const userReducer = (state = INITIAL_STATE, action) => {
  // console.log(action)
  switch (action.type) {
  case USER_REQUEST_LOGIN:
    return {
      ...state,
      ...action.dataLogin,
    };
  default:
    return state;
  }
};

export default userReducer;
