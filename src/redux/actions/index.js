// Coloque aqui suas actions
import {
  USER_REQUEST_LOGIN,
  ACTION_FETCH_REQUEST,
  USER_ADD_NEW_EXPENSE,
  USER_DELETE_EXPENSE,
  USER_EDIT_EXPENSE,
  USER_SAVE_EDITED_EXPENSE } from './actionTypes';
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

export const deleteExpense = (dataWithDeletedExpense) => ({
  type: USER_DELETE_EXPENSE,
  payload: dataWithDeletedExpense,
});

export const editItem = (id) => ({
  type: USER_EDIT_EXPENSE,
  payload: id,
});

export const saveEditedItem = (editedItem) => ({
  type: USER_SAVE_EDITED_EXPENSE,
  payload: editedItem,
});
