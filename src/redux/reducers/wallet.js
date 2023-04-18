import { TAKE_CURRENCIES, TAKE_EXPENSES, TAKE_DELETE } from '../type/casesOfType';
import { EDIT_EXPENSE, SAVE_EDITION_ACTION } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isEditing: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TAKE_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.currencies),
    };
  case TAKE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case TAKE_DELETE: {
    const attListexpenses = state.expenses.filter((e) => e !== action.expenses);
    console.log(attListexpenses);
    return {
      ...state,
      expenses: [...attListexpenses],
    };
  }
  case EDIT_EXPENSE:
    return {
      ...state,
      isEditing: true,
      idToEdit: action.editId,
    };
  case SAVE_EDITION_ACTION:
    return {
      ...state,
      expenses: [
        ...state.expenses.filter((e) => Number(e.id) !== Number(state.idToEdit)),
        {
          ...state.expenses.find((e) => Number(e.id) === Number(state.idToEdit)),
          ...action.expenseEdited,
        },
      ].sort((a, b) => a.id - b.id),
      isEditing: false,
    };
  default:
    return state;
  }
};

export default wallet;
