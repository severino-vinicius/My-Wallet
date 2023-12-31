// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ACTION_FETCH_REQUEST,
  USER_ADD_NEW_EXPENSE,
  USER_DELETE_EXPENSE,
  USER_EDIT_EXPENSE,
  USER_SAVE_EDITED_EXPENSE } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [], // Array de strings
  expenses: [], // Array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag
  editor: false, // Valor booleano que indica uma despesa está sendo editada
  idToEdit: 0, // Valor númerico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_FETCH_REQUEST:
    return {
      ...state,
      currencies: action.payload,
    };
  case USER_ADD_NEW_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.dataNewExpense],
    };
  case USER_DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...action.payload],
    };
  case USER_EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case USER_SAVE_EDITED_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === state.idToEdit) {
          return { ...action.payload };
        }
        return expense;
      }),
      editor: false,
      idToEdit: '',
    };
  default:
    return state;
  }
};

export default walletReducer;
