import { TAKE_CURRENCIES, TAKE_EXPENSES, TAKE_DELETE } from '../type/casesOfType';

export const getCurrencies = (currencies) => ({
  type: TAKE_CURRENCIES,
  currencies,
});

export const actionExpenses = (expenses) => ({
  type: TAKE_EXPENSES,
  expenses,
});

export const deleteAnExpense = (expenses) => ({
  type: TAKE_DELETE,
  expenses,
});

export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const editExpense = (editId) => ({
  type: EDIT_EXPENSE,
  editId,
});

export const SAVE_EDITION_ACTION = 'SAVE_EDITION_ACTION';
export const saveEditonAction = (expenseEdited) => ({
  type: SAVE_EDITION_ACTION,
  expenseEdited,
});
