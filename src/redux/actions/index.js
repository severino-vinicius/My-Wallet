// Coloque aqui suas actions
import { USER_REQUEST_LOGIN, ACTION_FETCH_REQUEST } from './actionTypes';

export const userLogin = ({ email }) => ({
  type: USER_REQUEST_LOGIN,
  dataLogin: {
    email,
  },
});

export const fetchRequest = (payload) => ({
  type: ACTION_FETCH_REQUEST,
  payload,
});
