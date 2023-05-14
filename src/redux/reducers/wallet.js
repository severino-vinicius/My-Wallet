// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ACTION_FETCH_REQUEST } from '../actions/actionTypes';

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
  default:
    return state;
  }
};

export default walletReducer;
