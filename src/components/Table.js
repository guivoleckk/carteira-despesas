import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteAnExpense, editExpense } from '../redux/actions';

class Table extends Component {
  expenseEdition = ({ target }) => {
    const { dispatch } = this.props;
    dispatch(editExpense(target.id));
  };

  deleteAnExpense = (expenseTarget) => {
    const { dispatch } = this.props;
    dispatch(deleteAnExpense(expenseTarget));
  };

  render() {
    const { expenses } = this.props;

    return (
      <div className="div-table">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => {
              const {
                id,
                description,
                tag,
                method,
                value,
                currency,
                exchangeRates,
              } = expense;

              const convertedValue = (
                Number(value) * Number(exchangeRates[currency].ask)
              ).toFixed(2);
              console.log(id);

              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{value}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>{Number(convertedValue).toFixed(2)}</td>
                  <td>
                    <button
                      className="button-delete"
                      data-testid="delete-btn"
                      onClick={ () => this.deleteAnExpense(expense) }
                    >
                      Excluir
                    </button>
                    <button
                      className="button-edit"
                      id={ expense.id }
                      data-testid="edit-btn"
                      onClick={ (event) => this.expenseEdition(event) }
                    >
                      Editar despesa

                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
