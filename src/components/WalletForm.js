import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies, actionExpenses, saveEditonAction } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const getCurrency = await this.requireCurrency();
    dispatch(getCurrencies(getCurrency));
  }

  componentDidUpdate(prev) {
    const { isEditing, idToEdit, expenses } = this.props;
    if (prev.idToEdit !== idToEdit && isEditing) {
      const expenseToEdit = expenses
        .find((expense) => Number(expense.id) === Number(idToEdit));
      this.setState({
        ...expenseToEdit,
      });
    }
  }

  requireCurrency = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    return data;
  };

  saveEditon = (state) => {
    const { idToEdit, dispatch } = this.props;
    const editExpense = {
      ...state,
      id: Number(idToEdit),
    };
    dispatch(saveEditonAction(editExpense));
  };

  handleSetOption = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    const expenseResult = await this.requireCurrency();
    this.setState({
      exchangeRates: expenseResult,
    }, () => {
      dispatch(actionExpenses(this.state));
      const { id } = this.state;
      this.setState({
        description: '',
        value: '',
        id: id + 1,
      });
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, isEditing } = this.props;
    return (
      <div className="div-input-form">
        <form className="form-input">
          <label>
            Valor
            <input
              className="input-type"
              name="value"
              placeholder="valor da despesa"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleSetOption }
            />
          </label>
          <label>
            Descrição
            <input
              className="input-type"
              name="description"
              placeholder="descrição da despesa"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleSetOption }
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              className="input-type"
              data-testid="currency-input"
              name="currency"
              id="currency"
              value={ currency }
              onChange={ this.handleSetOption }
            >
              {
                currencies.map((e, index) => (
                  <option key={ index } value={ e }>{ e }</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="choosePay">
            Forma de Pagamento
            <select
              className="input-type"
              name="method"
              data-testid="method-input"
              id="choosePay"
              onChange={ this.handleSetOption }
              value={ method }
            >
              <option name="dinheiro">Dinheiro</option>
              <option name="credito">Cartão de crédito</option>
              <option name="debito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="catInput">
            Categoria
            <select
              className="input-type"
              data-testid="tag-input"
              id="catInput"
              value={ tag }
              name="tag"
              onChange={ this.handleSetOption }
            >
              <option name="alimentacao">Alimentação</option>
              <option name="lazer">Lazer</option>
              <option name="trabalho">Trabalho</option>
              <option name="transporte">Transporte</option>
              <option name="saude">Saúde</option>
            </select>
          </label>

          <button
            className="button-add"
            type="button"
            onClick={ () => {
              if (!isEditing) {
                this.handleClick();
              } else {
                this.saveEditon(this.state);
              }
            } }
          >
            {
              isEditing ? 'Editar despesa' : 'Adicionar despesa'
            }
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  isEditing: state.wallet.isEditing,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  currencies: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
