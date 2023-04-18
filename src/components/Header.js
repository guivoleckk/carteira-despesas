import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const finalResult = expenses.reduce((acc, curr) => {
      const getCurrencyValue = Object.entries(curr.exchangeRates)
        .find((currency) => currency[0] === curr.currency);
      const { ask } = getCurrencyValue[1];
      return acc + Number(curr.value) * Number(ask);
    }, 0);
    return (
      <div>
        <p
          data-testid="email-field"
          className="email-header"
        >
          { email }
        </p>
        <p
          data-testid="total-field"
          className="result-header"
        >
          { finalResult.toFixed(2) }
        </p>
        <p
          data-testid="header-currency-field"
          className="brl"
        >
          <span>BRL</span>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
