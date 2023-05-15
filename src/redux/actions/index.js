// Coloque aqui suas actions
import {
  USER_REQUEST_LOGIN,
  ACTION_FETCH_REQUEST,
  USER_ADD_NEW_EXPENSE } from './actionTypes';
import getAwesomeAPIData from '../../service/economiaAwesomeApi';

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

export const addNewExpense = (wallettNewExpense) => ({
  type: USER_ADD_NEW_EXPENSE,
  dataNewExpense: {
    ...wallettNewExpense,
  },
});

export const fetchNewExpense = (dataWallet) => async (dispatch) => {
  const exchangeRates = await getAwesomeAPIData();
  delete exchangeRates.USDT;
  dispatch(addNewExpense({
    ...dataWallet,
    exchangeRates,
  }));
};
