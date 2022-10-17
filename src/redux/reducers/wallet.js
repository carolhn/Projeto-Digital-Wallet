// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ACT_CURRENCIES, ACT_EXPENSE, EX_DELETE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACT_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case ACT_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case EX_DELETE:
    return {
      ...state,
      expenses: [...action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
